import { createRealmContext } from "@realm/react";
import { Historico } from "./schemas/Historico";

export const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext({
	schema: [Historico],
});
