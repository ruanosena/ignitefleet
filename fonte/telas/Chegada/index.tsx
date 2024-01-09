import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { BSON } from "realm";
import { LatLng } from "react-native-maps";
import { Conteiner, Conteudo, Descricao, MensagemAsync, Placa, Rodape, Rotulo } from "./estilos";
import dayjs from "dayjs";
import { pararTarefaLocal } from "../../tarefas/localPlanoFundoTarefa";
import { useObject, useRealm } from "../../libs/realm";
import { Historico } from "../../libs/realm/schemas/Historico";
import { obterTimestampUltimaSinc } from "../../libs/asyncStorage/syncStorage";
import { obterLocais } from "../../libs/asyncStorage/armazenamentoLocal";
import { obterEnderecoLocal } from "../../utilitarios/obterEnderecoLocal";
import { Cabecalho } from "../../components/Cabecalho";
import { Botao } from "../../components/Botao";
import { BotaoIcone } from "../../components/BotaoIcone";
import { Mapa } from "../../components/Mapa";
import { Locais } from "../../components/Locais";
import { LocalInfoProps } from "../../components/LocalInfo";
import { Carregando } from "../../components/Carregando";

type RotaParamsProps = {
	id: string;
};

export function Chegada() {
	const [coordenadas, defCoordenadas] = useState<LatLng[]>([]);
	const [dadosNaoSinc, defDadosNaoSinc] = useState(false);
	const [partida, defPartida] = useState<LocalInfoProps>({} as LocalInfoProps);
	const [chegada, defChegada] = useState<LocalInfoProps | null>(null);
	const [estaCarregando, defEstaCarregando] = useState(true);
	const rota = useRoute();
	const { id } = rota.params as RotaParamsProps;

	const historico = useObject(Historico, new BSON.UUID(id) as unknown as string);
	const realm = useRealm();
	const { goBack: voltar } = useNavigation();

	const titulo = historico?.status == "partida" ? "Chegada" : "Detalhes";

	function lidarRemoverUsoVeiculo() {
		Alert.alert("Cancelar", "Cancelar a utilização do veículo?", [
			{
				text: "Não",
				style: "cancel",
			},
			{ text: "Sim", onPress: () => removerUsoVeiculo() },
		]);
	}

	async function removerUsoVeiculo() {
		realm.write(() => {
			realm.delete(historico);
		});

		await pararTarefaLocal();

		voltar();
	}

	async function lidarRegistroChegada() {
		try {
			if (!historico) {
				return Alert.alert(
					"Erro",
					"Não foi possível obter os dados para registrar a chegada do veículo."
				);
			}

			const locais = await obterLocais();

			realm.write(() => {
				historico.status = "chegada";
				historico.atualizado_em = new Date();
				historico.coords.push(...locais);
			});

			await pararTarefaLocal();

			Alert.alert("Chegada", "Chegada registrada com sucesso!");
			voltar();
		} catch (erro) {
			console.log(erro);
			Alert.alert("Erro", "não foi possível registrar a chegada do veículo.");
		}
	}

	async function obterInfoLocais() {
		if (!historico) {
			return;
		}
		const ultimaSinc = await obterTimestampUltimaSinc();
		const atualizadoEm = historico!.atualizado_em.getTime();
		defDadosNaoSinc(atualizadoEm > ultimaSinc);

		if (historico?.status == "partida") {
			const armazenamentoLocais = await obterLocais();
			defCoordenadas(armazenamentoLocais);
		} else {
			let coords = historico.coords.map(({ latitude, longitude }) => ({ latitude, longitude }));
			defCoordenadas(coords ?? []);
		}

		if (historico?.coords[0]) {
			const nomeRuaPartida = await obterEnderecoLocal(historico.coords[0]);
			defPartida({
				rotulo: `Saindo em ${nomeRuaPartida || ""}`,
				descricao: dayjs(new Date(historico.coords[0].timestamp)).format("DD/MM/YYYY [às] HH:mm"),
			});
		}

		if (historico?.status == "chegada") {
			const ultimoLocal = historico.coords[historico.coords.length - 1];
			const nomeRuaChegada = await obterEnderecoLocal(ultimoLocal);
			defChegada({
				rotulo: `Chegando em ${nomeRuaChegada || ""}`,
				descricao: dayjs(new Date(ultimoLocal.timestamp)).format("DD/MM/YYYY [às] HH:mm"),
			});
		}

		defEstaCarregando(false);
	}

	useEffect(() => {
		obterInfoLocais();
	}, [historico]);

	if (estaCarregando) {
		return <Carregando />;
	}

	return (
		<Conteiner>
			<Cabecalho titulo={titulo} />

			{coordenadas.length > 0 && <Mapa coordenadas={coordenadas} />}
			<Conteudo>
				<Locais partida={partida} chegada={chegada} />
				<Rotulo>Placa do veículo</Rotulo>
				<Placa>{historico?.placa}</Placa>
				<Rotulo>Finalidade</Rotulo>
				<Descricao>{historico?.descricao}</Descricao>
			</Conteudo>
			{historico?.status == "partida" && (
				<Rodape>
					<BotaoIcone icone="close" onPress={lidarRemoverUsoVeiculo} />
					<Botao onPress={lidarRegistroChegada}>Registrar chegada</Botao>
				</Rodape>
			)}

			{dadosNaoSinc && (
				<MensagemAsync>
					Sincronização da {historico?.status == "partida" ? "partida" : "chegada"} pendente.
				</MensagemAsync>
			)}
		</Conteiner>
	);
}
