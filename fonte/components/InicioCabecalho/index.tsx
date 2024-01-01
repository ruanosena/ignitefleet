import { TouchableOpacity } from "react-native";
import { BoasVindas, Conteiner, Foto, Icone, Mensagem, Nome } from "./estilos";
import { useApp, useUser } from "@realm/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function InicioCabecalho() {
	const usuario = useUser();
	const app = useApp();
	const encaixes = useSafeAreaInsets();

	const paddingTop = encaixes.top + 32;

	function lidarSair() {
		app.currentUser?.logOut();
	}

	return (
		<Conteiner style={{ paddingTop }}>
			<Foto
				source={{ uri: usuario?.profile.pictureUrl }}
				placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
			/>
			<BoasVindas>
				<Mensagem>Olá,</Mensagem>
				<Nome>{usuario?.profile.name}</Nome>
			</BoasVindas>

			<TouchableOpacity activeOpacity={0.7} onPress={lidarSair}>
				<Icone name="power" />
			</TouchableOpacity>
		</Conteiner>
	);
}
