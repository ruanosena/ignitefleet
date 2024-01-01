import React from "react";
import { Conteiner, Entrada, Rotulo } from "./estilos";
import { useTheme } from "styled-components/native";
import { TextInputProps } from "react-native";

type Props = TextInputProps & {
	rotulo?: string;
};

export function EntradaPlaca({ rotulo, ...rest }: Props) {
	const { COLORS } = useTheme();
	return (
		<Conteiner>
			<Rotulo>{rotulo}</Rotulo>
			<Entrada
				maxLength={7}
				autoCapitalize="characters"
				placeholderTextColor={COLORS.GRAY_400}
				{...rest}
			/>
		</Conteiner>
	);
}
