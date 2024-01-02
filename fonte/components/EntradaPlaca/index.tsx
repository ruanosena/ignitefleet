import React, { forwardRef } from "react";
import { Conteiner, Entrada, Rotulo } from "./estilos";
import { useTheme } from "styled-components/native";
import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
	rotulo?: string;
};

const EntradaPlaca = forwardRef<TextInput, Props>(({ rotulo, ...rest }, ref) => {
	const { COLORS } = useTheme();
	return (
		<Conteiner>
			<Rotulo>{rotulo}</Rotulo>
			<Entrada
				ref={ref}
				maxLength={7}
				autoCapitalize="characters"
				placeholderTextColor={COLORS.GRAY_400}
				{...rest}
			/>
		</Conteiner>
	);
});

export { EntradaPlaca };
