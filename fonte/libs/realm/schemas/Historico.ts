import { Realm } from "@realm/react";
import { CoordsSchemaProps } from "./Coords";

type GerarProps = {
	usuario_id: string;
	descricao: string;
	placa: string;
	coords: CoordsSchemaProps[];
};

export class Historico extends Realm.Object<Historico> {
	_id!: string;
	usuario_id!: string;
	placa!: string;
	descricao!: string;
	coords!: CoordsSchemaProps[];
	status!: string;
	criado_em!: Date;
	atualizado_em!: Date;

	static generate({ usuario_id, descricao, placa, coords }: GerarProps) {
		return {
			_id: new Realm.BSON.UUID(),
			usuario_id,
			descricao,
			coords,
			placa,
			status: "partida",
			criado_em: new Date(),
			atualizado_em: new Date(),
		};
	}
	static schema: Realm.ObjectSchema = {
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
			coords: {
				type: "list",
				objectType: "Coords"
			},
			status: "string",
			criado_em: "date",
			atualizado_em: "date",
		},
	};
}
