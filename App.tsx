import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { AppProvider, UserProvider } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { REALM_APP_ID } from "@env";
import Entrar from "./fonte/telas/Entrar";
import tema from "./fonte/tema";
import { Carregando } from "./fonte/components/Carregando";
import { Rotas } from "./fonte/rotas";
import { RealmProvider } from "./fonte/libs/realm";

export default function App() {
	const [fontesCarregadas] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	if (!fontesCarregadas) {
		return <Carregando />;
	}

	return (
		<AppProvider id={REALM_APP_ID}>
			<ThemeProvider theme={tema}>
				<SafeAreaProvider style={{ flex: 1, backgroundColor: tema.COLORS.GRAY_800 }}>
					<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
					<UserProvider fallback={Entrar}>
						<RealmProvider>
							<Rotas />
						</RealmProvider>
					</UserProvider>
				</SafeAreaProvider>
			</ThemeProvider>
		</AppProvider>
	);
}
