import * as GerenciadorTarefa from "expo-task-manager";
import {
	Accuracy,
	hasStartedLocationUpdatesAsync,
	startLocationUpdatesAsync,
	stopLocationUpdatesAsync,
} from "expo-location";
import { removerLocais, salvarLocal } from "../libs/asyncStorage/armazenamentoLocal";

export const PLANO_FUNDO_TAREFA_NOME = "rastreamento-localizacao";

GerenciadorTarefa.defineTask(PLANO_FUNDO_TAREFA_NOME, async ({ data, error }: any) => {
	try {
		if (error) throw error;

		if (data) {
			const { coords, timestamp } = data.locations[0];

			const localAtual = {
				latitude: coords.latitude,
				longitude: coords.longitude,
				timestamp,
			};

			await salvarLocal(localAtual);
		}
	} catch (erro) {
		console.log(erro);
		pararTarefaLocal();
	}
});

export async function iniciarTarefaRastrear() {
	try {
		const iniciou = await hasStartedLocationUpdatesAsync(PLANO_FUNDO_TAREFA_NOME);

		if (iniciou) {
			await pararTarefaLocal();
		}

		await startLocationUpdatesAsync(PLANO_FUNDO_TAREFA_NOME, {
			accuracy: Accuracy.Highest,
			distanceInterval: 1,
			timeInterval: 1000,
		});
	} catch (erro) {
		console.log(erro);
	}
}

export async function pararTarefaLocal() {
	try {
		const iniciou = await hasStartedLocationUpdatesAsync(PLANO_FUNDO_TAREFA_NOME);

		if (iniciou) {
			await stopLocationUpdatesAsync(PLANO_FUNDO_TAREFA_NOME);
			await removerLocais();
		}
	} catch (erro) {
		console.log(erro);
	}
}
