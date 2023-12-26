import { TouchableOpacityProps } from "react-native";
import { Carregando, Conteiner, Titulo } from "./estilos";
import { ReactNode } from "react";

type Props = TouchableOpacityProps & {
	children?: ReactNode;
	estaCarregando?: boolean;
};

export function Botao({ children, estaCarregando = false, ...rest }: Props) {
	return (
		<Conteiner activeOpacity={0.7} disabled={estaCarregando} {...rest}>
			{estaCarregando ? <Carregando /> : <Titulo>{children}</Titulo>}
		</Conteiner>
	);
}
