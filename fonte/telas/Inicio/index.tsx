import { useNavigation } from "@react-navigation/native";
import { InicioCabecalho } from "../../components/InicioCabecalho";
import { StatusCarro } from "../../components/StatusCarro";
import { Conteiner, Conteudo } from "./estilos";

export function Inicio() {
	const { navigate: navegar } = useNavigation();

	function lidarRegistrarMovimento() {
		navegar("saida");
	}

	return (
		<Conteiner>
			<InicioCabecalho />

			<Conteudo>
				<StatusCarro onPress={lidarRegistrarMovimento} />
			</Conteudo>
		</Conteiner>
	);
}
