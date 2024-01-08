import { CaixaIcone } from "../CaixaIcone";
import { Conteiner, Descricao, Info, Rotulo } from "./estilos";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type LocalInfoProps = {
	rotulo: string;
	descricao: string;
};

type Props = LocalInfoProps & {
	icone: keyof typeof MaterialCommunityIcons.glyphMap;
};

export function LocalInfo({ rotulo, descricao, icone }: Props) {
	return (
		<Conteiner>
			<CaixaIcone icone={icone} />
			<Info>
				<Rotulo numberOfLines={1}>{rotulo}</Rotulo>
				<Descricao numberOfLines={1}>{descricao}</Descricao>
			</Info>
		</Conteiner>
	);
}
