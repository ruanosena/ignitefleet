import { Realm } from "@realm/react";
import { ObjectSchema } from "realm";

type GerarProps = {
	usuario_id: string;
	descricao: string;
	placa: string;
};

export class Historico extends Realm.Object<Historico> {
	_id!: string;
	usuario_id!: string;
	placa!: string;
	descricao!: string;
	status!: string;
	criado_em!: string;
	atualizado_em!: string;

	static gerar({ usuario_id, descricao, placa }: GerarProps) {
		return {
			_id: new Realm.BSON.UUID(),
			usuario_id,
			descricao,
			placa,
			status: "partida",
			criado_em: new Date(),
			atualizado_em: new Date(),
		};
	}
	static schema: ObjectSchema = {
		name: "Historico",
		primaryKey: "_id",

		properties: {
			_id: "uuid",
			usuario_id: {
				type: "string",
				indexed: true,
			},
			placa: "string",
			descricao: "string",
			status: "string",
			criado_em: "date",
			atualizado_em: "date",
		},
	};
}
