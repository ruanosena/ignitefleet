import { createRealmContext } from "@realm/react";
import { OpenRealmBehaviorType } from "realm";
import { Historico } from "./schemas/Historico";

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
	type: OpenRealmBehaviorType.OpenImmediately,
};
export const syncConfig: any = {
	flexible: true,
	newRealmFileBehavior: realmAccessBehavior,
	existingRealmFileBehavior: realmAccessBehavior,
};

export const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext({
	schema: [Historico],
});
