import Realm from "realm";
import "react-native-get-random-values";
import "./fonte/libs/dayjs";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { AppProvider, UserProvider } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNetInfo } from "@react-native-community/netinfo";
import { REALM_APP_ID } from "@env";
import Entrar from "./fonte/telas/Entrar";
import tema from "./fonte/tema";
import { Rotas } from "./fonte/rotas";
import { RealmProvider, syncConfig } from "./fonte/libs/realm";
import { Carregando } from "./fonte/components/Carregando";
import { MensagemTopo } from "./fonte/components/MensagemTopo";

export default function App() {
	const netInfo = useNetInfo();
	const [fontesCarregadas] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	if (!fontesCarregadas) {
		return <Carregando />;
	}

	return (
		<AppProvider id={REALM_APP_ID}>
			<ThemeProvider theme={tema}>
				<SafeAreaProvider style={{ flex: 1, backgroundColor: tema.COLORS.GRAY_800 }}>
					<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
					{!netInfo.isConnected && <MensagemTopo titulo="Você está offline" icone="wifi-off" />}
					<UserProvider fallback={Entrar}>
						<RealmProvider sync={syncConfig} fallback={Carregando}>
							<Rotas />
						</RealmProvider>
					</UserProvider>
				</SafeAreaProvider>
			</ThemeProvider>
		</AppProvider>
	);
}
