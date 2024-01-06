import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { BSON } from "realm";
import { useObject, useRealm } from "../../libs/realm";
import { Historico } from "../../libs/realm/schemas/Historico";
import { Conteiner, Conteudo, Descricao, MensagemAsync, Placa, Rodape, Rotulo } from "./estilos";
import { Cabecalho } from "../../components/Cabecalho";
import { Botao } from "../../components/Botao";
import { BotaoIcone } from "../../components/BotaoIcone";
import { useEffect, useState } from "react";
import { obterTimestampUltimaSinc } from "../../libs/asyncStorage/syncStorage";

type RotaParamsProps = {
	id: string;
};

export function Chegada() {
	const [dadosNaoSinc, defDadosNaoSinc] = useState(false);
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

	function removerUsoVeiculo() {
		realm.write(() => {
			realm.delete(historico);
		});

		voltar();
	}

	function lidarRegistroChegada() {
		try {
			if (!historico) {
				return Alert.alert(
					"Erro",
					"Não foi possível obter os dados para registrar a chegada do veículo."
				);
			}

			realm.write(() => {
				historico.status = "chegada";
				historico.atualizado_em = new Date();
			});

			Alert.alert("Chegada", "Chegada registrada com sucesso!");
			voltar();
		} catch (erro) {
			console.log(erro);
			Alert.alert("Erro", "não foi possível registrar a chegada do veículo.");
		}
	}

	useEffect(() => {
		obterTimestampUltimaSinc().then((ultimaSinc) =>
			defDadosNaoSinc(historico!.atualizado_em.getTime() > ultimaSinc)
		);
	}, []);

	return (
		<Conteiner>
			<Cabecalho titulo={titulo} />
			<Conteudo>
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
