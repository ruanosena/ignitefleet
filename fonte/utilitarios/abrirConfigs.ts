import { Linking, Platform } from "react-native";

export function abrirConfigs() {
	if (Platform.OS == "ios") {
		return Linking.openURL("app-settings:");
	}
	if (Platform.OS == "android") {
		return Linking.openSettings();
	}
}
