import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Inicio } from "../telas/Inicio";

const { Navigator: Navegador, Screen: Tela } = createNativeStackNavigator();

export function AppRotas() {
	return (
		<Navegador screenOptions={{ headerShown: false }}>
			<Tela name="inicio" component={Inicio} />
		</Navegador>
	);
}
