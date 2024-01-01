import styled from "styled-components/native";

export const Conteiner = styled.TouchableOpacity`
	width: 100%;
	margin: 32px 0;
	padding: 22px;
	border-radius: 6px;
	background-color: ${({ theme }) => theme.COLORS.GRAY_700};
	flex-direction: row;
	align-items: center;
`;

export const CaixaIcone = styled.View`
	width: 77px;
	height: 77px;
	border-radius: 6px;
	background-color: ${({ theme }) => theme.COLORS.GRAY_600};
	margin-right: 12px;
	justify-content: center;
	align-items: center;
`;

export const Mensagem = styled.Text`
	flex: 1;
	text-align: justify;
  textAlignVertical: center;
	color: ${({ theme }) => theme.COLORS.GRAY_100};
	font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
	font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const TextoDestaque = styled.Text`
	color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
	font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
	font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
