import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Conteiner, Titulo } from "./estilos";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

type Props = {
	titulo?: string;
};

export function Cabecalho({ titulo }: Props) {
	const { COLORS } = useTheme();
	const encaixes = useSafeAreaInsets();
	const { goBack: voltar } = useNavigation();

	const paddingTop = encaixes.top + 42;

	return (
		<Conteiner style={{ paddingTop }}>
			<TouchableOpacity activeOpacity={0.7} onPress={voltar}>
				<MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.BRAND_LIGHT} />
			</TouchableOpacity>

			<Titulo>{titulo}</Titulo>
		</Conteiner>
	);
}
