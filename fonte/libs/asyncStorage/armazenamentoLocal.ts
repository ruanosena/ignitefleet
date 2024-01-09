import AsyncStorage from "@react-native-async-storage/async-storage";

const ARMAZENAMENTO_CHAVE = "@ignitefleet:local";

type localProps = {
	latitude: number;
	longitude: number;
	timestamp: number;
};

export async function obterLocais() {
	const armazenamento = await AsyncStorage.getItem(ARMAZENAMENTO_CHAVE);
	const resposta = armazenamento ? JSON.parse(armazenamento) : [];

	return resposta;
}

export async function salvarLocal(novoLocal: localProps) {
	const armazenamento = await obterLocais();
	armazenamento.push(novoLocal);

	await AsyncStorage.setItem(ARMAZENAMENTO_CHAVE, JSON.stringify(armazenamento));
}

export async function removerLocais() {
	await AsyncStorage.removeItem(ARMAZENAMENTO_CHAVE);
}
