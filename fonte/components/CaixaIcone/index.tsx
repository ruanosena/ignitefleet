import { useTheme } from "styled-components/native";
import { Conteiner, TamanhoProps } from "./estilos";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
	tamanho?: TamanhoProps;
	icone: keyof typeof MaterialCommunityIcons.glyphMap;
};

export function CaixaIcone({ tamanho = "normal", icone }: Props) {
	const iconeTamanho = tamanho == "normal" ? 24 : 16;
	const { COLORS } = useTheme();
	return (
		<Conteiner tamanho={tamanho}>
			<MaterialCommunityIcons name={icone} size={iconeTamanho} color={COLORS.BRAND_LIGHT} />
		</Conteiner>
	);
}
