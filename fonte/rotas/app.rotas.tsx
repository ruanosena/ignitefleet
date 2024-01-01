import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Inicio } from "../telas/Inicio";
import { Saida } from "../telas/Saida";

const { Navigator: Navegador, Screen: Tela } = createNativeStackNavigator();

export function AppRotas() {
	return (
		<Navegador screenOptions={{ headerShown: false }}>
			<Tela name="inicio" component={Inicio} />
			<Tela name="saida" component={Saida} />
		</Navegador>
	);
}
