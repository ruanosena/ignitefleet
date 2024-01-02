import { useRef, useState } from "react";
import { TextInput, ScrollView, Alert } from "react-native";
import { useUser } from "@realm/react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Botao } from "../../components/Botao";
import { Cabecalho } from "../../components/Cabecalho";
import { EntradaPlaca } from "../../components/EntradaPlaca";
import { EntradaTextoArea } from "../../components/EntradaTextoArea";
import { Conteiner, Conteudo } from "./estilos";
import { validarPlaca } from "../../utilitarios/validarPlaca";
import { useRealm } from "../../libs/realm";
import { Historico } from "../../libs/realm/schemas/Historico";

export function Saida() {
	const [placa, defPlaca] = useState("");
	const [descricao, defDescricao] = useState("");
	const [estaRegistrando, defEstaRegistrando] = useState(false);

	const descricaoRef = useRef<TextInput>(null);
	const placaRef = useRef<TextInput>(null);

	const { goBack: voltar } = useNavigation();
	const realm = useRealm();
	const usuario = useUser();

	function lidarRegistrarSaida() {
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

			defEstaRegistrando(true);

			realm.write(() => {
				realm.create(
					"Historico",
					Historico.gerar({
						usuario_id: usuario!.id,
						placa: placa.toUpperCase(),
						descricao,
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

	return (
		<Conteiner>
			<Cabecalho titulo="Saída" />

			<KeyboardAwareScrollView extraHeight={100}>
				<ScrollView>
					<Conteudo>
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
