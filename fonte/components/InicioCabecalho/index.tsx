import { TouchableOpacity } from "react-native";
import { BoasVindas, Conteiner, Foto, Icone, Mensagem, Nome } from "./estilos";
import { useApp, useUser } from "@realm/react";

export function InicioCabecalho() {
	const usuario = useUser();
	const app = useApp();

	function lidarSair() {
		app.currentUser?.logOut();
	}

	return (
		<Conteiner>
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
