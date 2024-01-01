import { useRef } from "react";
import { TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Botao } from "../../components/Botao";
import { Cabecalho } from "../../components/Cabecalho";
import { EntradaPlaca } from "../../components/EntradaPlaca";
import { EntradaTextoArea } from "../../components/EntradaTextoArea";
import { Conteiner, Conteudo } from "./estilos";

export function Saida() {
	const descricaoRef = useRef<TextInput>(null);
	const kbdAvoidingViewBehavior = Platform.OS == "android" ? "height" : "position";

	function lidarRegistrarSaida() {
		console.log("Ok");
	}

	return (
		<Conteiner>
			<Cabecalho titulo="Saída" />

			<KeyboardAvoidingView style={{ flex: 1 }} behavior={kbdAvoidingViewBehavior}>
				<ScrollView>
					<Conteudo>
						<EntradaPlaca
							rotulo="Placa do veículo"
							placeholder="BRA1234"
							onSubmitEditing={() => descricaoRef.current?.focus()}
							returnKeyType="next"
						/>
						<EntradaTextoArea
							ref={descricaoRef}
							rotulo="Finalidade"
							placeholder="Vou utilizar o veículo para..."
							onSubmitEditing={lidarRegistrarSaida}
							returnKeyType="send"
							blurOnSubmit
						/>

						<Botao onPress={lidarRegistrarSaida}>Registrar saída</Botao>
					</Conteudo>
				</ScrollView>
			</KeyboardAvoidingView>
		</Conteiner>
	);
}
