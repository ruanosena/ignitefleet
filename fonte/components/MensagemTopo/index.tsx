import { useTheme } from "styled-components/native";
import { Conteiner, Titulo } from "./estilos";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
	icone?: keyof typeof MaterialCommunityIcons.glyphMap;
	titulo: string;
};

export function MensagemTopo({ titulo, icone }: Props) {
	const { COLORS } = useTheme();
	const encaixes = useSafeAreaInsets();

	const paddingTop = encaixes.top + 5;

	return (
		<Conteiner style={{ paddingTop }}>
			{icone && <MaterialCommunityIcons name={icone} size={18} color={COLORS.GRAY_100} />}
			<Titulo>{titulo}</Titulo>
		</Conteiner>
	);
}
