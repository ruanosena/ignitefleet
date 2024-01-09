import { reverseGeocodeAsync } from "expo-location";

type Props = {
	latitude: number;
	longitude: number;
};

export async function obterEnderecoLocal({ latitude, longitude }: Props) {
	try {
		const enderecoResposta = await reverseGeocodeAsync({ latitude, longitude });
		return enderecoResposta[0]?.street;
	} catch (erro) {
		console.log(erro);
	}
}
