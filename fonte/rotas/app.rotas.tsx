import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Inicio } from "../telas/Inicio";
import { Saida } from "../telas/Saida";
import { Chegada } from "../telas/Chegada";

const { Navigator: Navegador, Screen: Tela } = createNativeStackNavigator();

export function AppRotas() {
	return (
		<Navegador screenOptions={{ headerShown: false }}>
			<Tela name="inicio" component={Inicio} />
			<Tela name="saida" component={Saida} />
			<Tela name="chegada" component={Chegada} />
		</Navegador>
	);
}
