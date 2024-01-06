import AsyncStorage from "@react-native-async-storage/async-storage";

const ASYNC_STORAGE_KEY = "@ignitefleet:last_sync";

export async function salvarTimestampUltimaSinc() {
	const timestamp = new Date().getTime();
	await AsyncStorage.setItem(ASYNC_STORAGE_KEY, timestamp.toString());

	return timestamp;
}

export async function obterTimestampUltimaSinc() {
	const resposta = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);

	return Number(resposta);
}
