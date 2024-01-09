import { useEffect, useRef, useState } from "react";
import { TextInput, ScrollView, Alert } from "react-native";
import { useUser } from "@realm/react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
	useForegroundPermissions,
	requestBackgroundPermissionsAsync,
	watchPositionAsync,
	LocationAccuracy,
	LocationSubscription,
	LocationObjectCoords,
} from "expo-location";
import { Botao } from "../../components/Botao";
import { Cabecalho } from "../../components/Cabecalho";
import { EntradaPlaca } from "../../components/EntradaPlaca";
import { EntradaTextoArea } from "../../components/EntradaTextoArea";
import { Conteiner, Conteudo, ConteudoMensagem, Mensagem } from "./estilos";
import { validarPlaca } from "../../utilitarios/validarPlaca";
import { obterEnderecoLocal } from "../../utilitarios/obterEnderecoLocal";
import { useRealm } from "../../libs/realm";
import { Historico } from "../../libs/realm/schemas/Historico";
import { Carregando } from "../../components/Carregando";
import { LocalInfo } from "../../components/LocalInfo";
import { Mapa } from "../../components/Mapa";
import { iniciarTarefaRastrear } from "../../tarefas/localPlanoFundoTarefa";
import { abrirConfigs } from "../../utilitarios/abrirConfigs";

export function Saida() {
	const [placa, defPlaca] = useState("");
	const [descricao, defDescricao] = useState("");
	const [estaRegistrando, defEstaRegistrando] = useState(false);
	const [estaCarregandoLocal, defEstaCarregandoLocal] = useState(true);
	const [enderecoAtual, defEnderecoAtual] = useState<string | null>(null);
	const [coordsAtual, defCoordsAtual] = useState<LocationObjectCoords | null>(null);

	const [permissaoLocalPrimeiroPlano, requerirPermissaoLocalPrimeiroPlano] =
		useForegroundPermissions();

	const descricaoRef = useRef<TextInput>(null);
	const placaRef = useRef<TextInput>(null);

	const { goBack: voltar } = useNavigation();
	const realm = useRealm();
	const usuario = useUser();

	async function lidarRegistrarSaida() {
		try {
			if (!validarPlaca(placa)) {
				placaRef.current?.focus();
				return Alert.alert(
					"Placa inválida",
					"A placa é inválida. Por favor informe a placa correta do veículo."
				);
			}
			if (!descricao.trim().length) {
				return Alert.alert(
					"Finalidade",
					"Por favor informe a finalidade da utilização do veículo."
				);
			}

			if (!coordsAtual?.latitude || !coordsAtual?.longitude) {
				return Alert.alert(
					"Localização",
					"Não foi possível obter a localização atual, tente novamente."
				);
			}

			defEstaRegistrando(true);

			const permissaoPlanoFundo = await requestBackgroundPermissionsAsync();

			if (!permissaoPlanoFundo.granted) {
				defEstaRegistrando(false);
				return Alert.alert(
					"Localização",
					"É necessário permitir que o app tenha acesso a localização em segundo plano. Acesse as configurações do dispositivo e habilite 'Permitir o tempo todo'.",
					[{ text: "Abrir configurações", onPress: abrirConfigs }]
				);
			}

			iniciarTarefaRastrear();

			realm.write(() => {
				realm.create(
					"Historico",
					Historico.generate({
						usuario_id: usuario!.id,
						placa: placa.toUpperCase(),
						descricao,
						coords: [
							{
								latitude: coordsAtual.latitude,
								longitude: coordsAtual.longitude,
								timestamp: new Date().getTime(),
							},
						],
					})
				);
			});

			Alert.alert("Saída", "Saída do veículo registrada com sucesso!");
			voltar();
		} catch (erro) {
			console.log(erro);
			Alert.alert("Erro", "Não foi possível registrar a saída do veículo.");
			defEstaRegistrando(false);
		}
	}

	useEffect(() => {
		requerirPermissaoLocalPrimeiroPlano();
	}, []);

	useEffect(() => {
		if (!permissaoLocalPrimeiroPlano?.granted) {
			return;
		}
		let inscricao: LocationSubscription;
		watchPositionAsync(
			{
				accuracy: LocationAccuracy.High,
				timeInterval: 1000,
			},
			(local) => {
				defCoordsAtual(local.coords);
				obterEnderecoLocal(local.coords)
					.then((endereco) => {
						if (endereco) {
							defEnderecoAtual(endereco);
						}
					})
					.finally(() => defEstaCarregandoLocal(false));
			}
		).then((resposta) => (inscricao = resposta));

		return () => inscricao?.remove();
	}, [permissaoLocalPrimeiroPlano]);

	if (!permissaoLocalPrimeiroPlano?.granted) {
		return (
			<Conteiner>
				<Cabecalho titulo="Saída" />
				<ConteudoMensagem>
					<Mensagem>
						Você precisa permitir o acesso a localização para utilizar essa funcionalidade. Por
						favor, acesse as configurações do aplicativo para conceder essa permissão ao aplicativo.
					</Mensagem>

					<Botao onPress={abrirConfigs}>Abrir configurações</Botao>
				</ConteudoMensagem>
			</Conteiner>
		);
	}

	if (estaCarregandoLocal) {
		return <Carregando />;
	}

	return (
		<Conteiner>
			<Cabecalho titulo="Saída" />

			<KeyboardAwareScrollView extraHeight={100}>
				<ScrollView>
					{coordsAtual && <Mapa coordenadas={[coordsAtual]} />}
					<Conteudo>
						{enderecoAtual && (
							<LocalInfo icone="car" rotulo="Localização atual" descricao={enderecoAtual} />
						)}
						<EntradaPlaca
							ref={placaRef}
							rotulo="Placa do veículo"
							placeholder="BRA1234"
							onSubmitEditing={() => descricaoRef.current?.focus()}
							returnKeyType="next"
							onChangeText={defPlaca}
						/>
						<EntradaTextoArea
							ref={descricaoRef}
							rotulo="Finalidade"
							placeholder="Vou utilizar o veículo para..."
							onSubmitEditing={lidarRegistrarSaida}
							returnKeyType="send"
							blurOnSubmit
							onChangeText={defDescricao}
						/>

						<Botao onPress={lidarRegistrarSaida} estaCarregando={estaRegistrando}>
							Registrar saída
						</Botao>
					</Conteudo>
				</ScrollView>
			</KeyboardAwareScrollView>
		</Conteiner>
	);
}
