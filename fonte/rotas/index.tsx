import { NavigationContainer } from "@react-navigation/native";
import { AppRotas } from "./app.rotas";
import Torrada from "react-native-toast-message";
import { MensagemTopo } from "../components/MensagemTopo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Rotas() {
	const encaixes = useSafeAreaInsets();

	return (
		<NavigationContainer>
			<AppRotas />
			<Torrada
				config={{
					info: ({ text1 }) => <MensagemTopo titulo={String(text1)} />,
				}}
				topOffset={encaixes.top}
			/>
		</NavigationContainer>
	);
}
