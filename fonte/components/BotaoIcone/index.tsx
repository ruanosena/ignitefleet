import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Conteiner } from "./estilos";

type Props = TouchableOpacityProps & {
	icone: keyof typeof MaterialCommunityIcons.glyphMap;
};

export function BotaoIcone({ icone, ...rest }: Props) {
	const { COLORS } = useTheme();

	return (
		<Conteiner activeOpacity={0.7} {...rest}>
			<MaterialCommunityIcons name={icone} size={24} color={COLORS.BRAND_MID} />
		</Conteiner>
	);
}
