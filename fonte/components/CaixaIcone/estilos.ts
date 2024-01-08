import styled, { css } from "styled-components/native";

export type TamanhoProps = "pequeno" | "normal";

type Props = {
	tamanho: TamanhoProps;
};

const varianteTamanhoEstilos = (tamanho: TamanhoProps) => {
	return {
		pequeno: css`
			width: 32px;
			height: 32px;
		`,
		normal: css`
			width: 46px;
			height: 46px;
		`,
	}[tamanho];
};

export const Conteiner = styled.View<Props>`
	border-radius: 6px;
	background-color: ${({ theme }) => theme.COLORS.GRAY_700};
	justify-content: center;
	align-items: center;
	margin-right: 12px;
	${({ tamanho }) => varianteTamanhoEstilos(tamanho)}
`;
