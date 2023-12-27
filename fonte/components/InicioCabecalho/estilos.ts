import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

export const Conteiner = styled.View`
	width: 100%;
	padding: 32px;
	flex-direction: row;
	align-items: center;
	background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const BoasVindas = styled.View`
	flex: 1;
	margin-left: 12px;
`;

export const Mensagem = styled.Text`
	color: ${({ theme }) => theme.COLORS.GRAY_100};
	font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
	font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const Nome = styled.Text`
	color: ${({ theme }) => theme.COLORS.GRAY_100};
	font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
	font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Icone = styled(MaterialCommunityIcons).attrs(({ theme }) => ({
	size: 32,
	color: theme.COLORS.GRAY_400,
}))``;

export const Foto = styled(Image)`
	width: 54px;
	height: 54px;
	border-radius: 7px;
`;
