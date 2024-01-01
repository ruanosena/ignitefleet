import styled from "styled-components/native";

export const Conteiner = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Conteudo = styled.View`
	flex: 1;
	gap: 16px;
	padding: 32px;
	margin-top: 16px;
`;
