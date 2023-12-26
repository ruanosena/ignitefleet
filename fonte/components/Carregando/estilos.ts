import styled from "styled-components/native";
import tema from "../../tema";

export const Conteiner = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${tema.COLORS.GRAY_800};
`;

export const Indicador = styled.ActivityIndicator.attrs(() => ({
	color: tema.COLORS.BRAND_LIGHT,
}))``;
