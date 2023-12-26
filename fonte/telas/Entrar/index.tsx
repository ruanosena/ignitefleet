import { Conteiner, Titulo, Slogan } from "./estilos";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Realm, useApp } from "@realm/react";
import imgFundo from "../../assets/background.png";
import { Botao } from "../../components/Botao";
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import { useState } from "react";
import { Alert } from "react-native";

GoogleSignin.configure({
	scopes: ["email", "profile"],
	webClientId: WEB_CLIENT_ID,
	iosClientId: IOS_CLIENT_ID,
});

export default function Entrar() {
	const [estaAutenticando, defEstaAutenticando] = useState(false);
	const app = useApp();

	async function lidarEntrarGoogle() {
		try {
			defEstaAutenticando(true);
			const { idToken } = await GoogleSignin.signIn();
			if (idToken) {
				const credenciais = Realm.Credentials.jwt(idToken);

				await app.logIn(credenciais);
			} else {
				Alert.alert("Entrar", "Não foi possível conectar-se a sua conta Google");
			}
		} catch (erro) {
			console.log(erro);
			Alert.alert("Entrar", "Não foi possível conectar-se a sua conta Google");
			defEstaAutenticando(false);
		} finally {
			defEstaAutenticando(false);
		}
	}

	return (
		<Conteiner source={imgFundo}>
			<Titulo>Ignite fleet</Titulo>
			<Slogan>Gestão de uso de veículos</Slogan>
			<Botao estaCarregando={estaAutenticando} onPress={lidarEntrarGoogle}>
				Entrar com Google
			</Botao>
		</Conteiner>
	);
}
