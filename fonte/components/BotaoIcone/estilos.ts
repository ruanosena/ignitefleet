import styled from "styled-components/native";

export const Conteiner = styled.TouchableOpacity`
	height: 56px;
	width: 56px;
	border-radius: 6px;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;
