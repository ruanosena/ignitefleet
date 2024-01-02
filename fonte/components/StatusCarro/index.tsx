import { CaixaIcone, Conteiner, Mensagem, TextoDestaque } from "./estilos";
import { useTheme } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
	placa?: string | null;
};

export function StatusCarro({ placa = null, ...rest }: Props) {
	const tema = useTheme();

	const iconeNome = placa ? "car-outline" : "key-outline";
	const mensagem = placa ? `Veículo ${placa} em uso. ` : `Nenhum veículo em uso. `;
	const status = placa ? "chegada" : "saída";

	return (
		<Conteiner {...rest}>
			<CaixaIcone>
				<MaterialCommunityIcons name={iconeNome} size={52} color={tema.COLORS.BRAND_LIGHT} />
			</CaixaIcone>

			<Mensagem>
				{mensagem}
				<TextoDestaque>Clique aqui para registrar a {status}</TextoDestaque>
			</Mensagem>
		</Conteiner>
	);
}
