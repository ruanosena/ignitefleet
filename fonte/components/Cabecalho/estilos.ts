import styled from "styled-components/native";

export const Conteiner = styled.View`
	width: 100%;
	padding: 0 32px 24px;
	flex-direction: row;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Titulo = styled.Text`
	color: ${({ theme }) => theme.COLORS.GRAY_100};
	font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
	font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
