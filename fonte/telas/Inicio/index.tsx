import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import Torrada from "react-native-toast-message";
import {
	obterTimestampUltimaSinc,
	salvarTimestampUltimaSinc,
} from "../../libs/asyncStorage/syncStorage";
import { useQuery, useRealm } from "../../libs/realm";
import { Historico } from "../../libs/realm/schemas/Historico";
import { InicioCabecalho } from "../../components/InicioCabecalho";
import { StatusCarro } from "../../components/StatusCarro";
import { Conteiner, Conteudo, Rotulo, Titulo } from "./estilos";
import { CartaoHistorico, CartaoHistoricoProps } from "../../components/CartaoHistorico";
import { useUser, Realm } from "@realm/react";
import { MensagemTopo } from "../../components/MensagemTopo";

export function Inicio() {
	const [veiculoEmUso, defVeiculoEmUso] = useState<Historico | null>(null);
	const [veiculoHistorico, defVeiculoHistorico] = useState<CartaoHistoricoProps[]>([]);
	const [porcentagemSinc, defPorcentagemSinc] = useState<string | null>(null);
	const { navigate: navegar } = useNavigation();

	const usuario = useUser();
	const historico = useQuery(Historico);
	const realm = useRealm();

	function lidarRegistrarMovimento() {
		if (veiculoEmUso?._id) {
			return navegar("chegada", { id: veiculoEmUso._id.toString() });
		} else {
			navegar("saida");
		}
	}

	function buscarVeiculoEmUso() {
		try {
			const veiculo = historico.filtered("status = 'partida'")[0];
			defVeiculoEmUso(veiculo);
		} catch (erro) {
			Alert.alert("Veículo em uso", "Não foi possível carregar o veículo em uso.");
			console.log(erro);
		}
	}

	async function buscarHistorico() {
		try {
			const resposta = historico.filtered("status = 'chegada' SORT(criado_em DESC)");

			const ultimaSinc = await obterTimestampUltimaSinc();

			const historicoFormatado = resposta.map((item) => {
				return {
					id: item._id!.toString(),
					placa: item.placa,
					estaSinc: ultimaSinc > item.atualizado_em!.getTime(),
					criado: dayjs(item.criado_em).format("[Saída em] DD/MM/YYYY [às] HH:mm"),
				};
			});

			defVeiculoHistorico(historicoFormatado);
		} catch (erro) {
			console.log(erro);
			Alert.alert("Histórico", "Não foi possível carregar o histórico.");
		}
	}

	function lidarDetalhesHistorico(id: string) {
		navegar("chegada", { id });
	}

	async function notificacaoProgresso(transferido: number, transferivel: number) {
		const porcentagem = (transferido / transferivel) * 100;

		if (porcentagem == 100) {
			await salvarTimestampUltimaSinc();
			await buscarHistorico();
			defPorcentagemSinc(null);

			Torrada.show({
				type: "info",
				text1: "Todos os dados estão sincronizados.",
			});
		} else {
			defPorcentagemSinc(`${porcentagem.toFixed(0)}% sincronizado.`);
		}
	}

	useEffect(() => {
		buscarHistorico();
	}, [historico]);

	useEffect(() => {
		buscarVeiculoEmUso();
	}, []);

	useEffect(() => {
		realm.addListener("change", buscarVeiculoEmUso);

		return () => {
			if (realm && !realm.isClosed) {
				realm.removeListener("change", buscarVeiculoEmUso);
			}
		};
	}, []);

	useEffect(() => {
		realm.subscriptions.update((multableSubs, realm) => {
			const historicoPorUsuarioConsulta = realm
				.objects("Historico")
				.filtered(`usuario_id = '${usuario!.id}'`);

			multableSubs.add(historicoPorUsuarioConsulta, { name: "historico_por_usuario" });
		});
	}, [realm]);

	useEffect(() => {
		const syncSession = realm.syncSession;

		if (!syncSession) {
			return;
		}

		syncSession.addProgressNotification(
			Realm.ProgressDirection.Upload,
			Realm.ProgressMode.ReportIndefinitely,
			notificacaoProgresso
		);

		return () => syncSession.removeProgressNotification(notificacaoProgresso);
	}, []);

	return (
		<Conteiner>
			{porcentagemSinc && <MensagemTopo titulo={porcentagemSinc} icone="cloud-upload" />}
			<InicioCabecalho />

			<Conteudo>
				<StatusCarro onPress={lidarRegistrarMovimento} placa={veiculoEmUso?.placa} />

				<Titulo>Histórico</Titulo>
				<FlatList
					data={veiculoHistorico}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<CartaoHistorico dados={item} onPress={() => lidarDetalhesHistorico(item.id)} />
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 100 }}
					ListEmptyComponent={<Rotulo>Nenhum registro de utilização.</Rotulo>}
				/>
			</Conteudo>
		</Conteiner>
	);
}
