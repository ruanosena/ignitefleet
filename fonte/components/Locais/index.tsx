import { Conteiner, Traco } from "./estilos";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LocalInfo, LocalInfoProps } from "../LocalInfo";

type Props = {
	partida: LocalInfoProps;
	chegada?: LocalInfoProps | null;
};

export function Locais({ partida, chegada }: Props) {
	return (
		<Conteiner>
			<LocalInfo icone="car" {...partida} />

			{chegada && (
				<>
					<Traco />
					<LocalInfo icone="flag-checkered" {...chegada} />
				</>
			)}
		</Conteiner>
	);
}
