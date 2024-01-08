import { reverseGeocodeAsync, LocationObjectCoords } from "expo-location";

export async function obterEnderecoLocal({ latitude, longitude }: LocationObjectCoords) {
	try {
		const enderecoResposta = await reverseGeocodeAsync({ latitude, longitude });
		return enderecoResposta[0]?.street;
	} catch (erro) {
		console.log(erro);
	}
}
