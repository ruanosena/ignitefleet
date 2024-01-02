import { TouchableOpacityProps } from "react-native";
import { Conteiner, Info, Placa, Saida } from "./estilos";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

export type CartaoHistoricoProps = {
	id: string;
	placa: string;
	criado: string;
	estaSinc: boolean;
};

type Props = TouchableOpacityProps & {
	dados: CartaoHistoricoProps;
};

export function CartaoHistorico({ dados, ...rest }: Props) {
	const { COLORS } = useTheme();

	return (
		<Conteiner activeOpacity={0.7} {...rest}>
			<Info>
				<Placa>{dados.placa}</Placa>
				<Saida>{dados.criado}</Saida>
			</Info>

			{dados.estaSinc ? (
				<MaterialCommunityIcons name="check" size={24} color={COLORS.BRAND_LIGHT} />
			) : (
				<MaterialCommunityIcons name="clock-alert-outline" size={24} color={COLORS.GRAY_400} />
			)}
		</Conteiner>
	);
}
