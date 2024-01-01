import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Conteiner, Entrada, Rotulo } from "./estilos";

type Props = TextInputProps & {
	rotulo?: string;
};

const EntradaTextoArea = forwardRef<TextInput, Props>(({ rotulo, ...rest }, ref) => {
	const { COLORS } = useTheme();

	return (
		<Conteiner>
			<Rotulo>{rotulo}</Rotulo>
			<Entrada
				ref={ref}
				placeholderTextColor={COLORS.GRAY_400}
				multiline
				autoCapitalize="sentences"
				{...rest}
			/>
		</Conteiner>
	);
});

export { EntradaTextoArea };
