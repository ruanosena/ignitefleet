import { useRef } from "react";
import MapView, {
	PROVIDER_GOOGLE,
	MapViewProps,
	LatLng,
	Marker,
	Polyline,
} from "react-native-maps";
import { CaixaIcone } from "../CaixaIcone";
import { useTheme } from "styled-components/native";

type Props = MapViewProps & {
	coordenadas: LatLng[];
};

export function Mapa({ coordenadas, ...rest }: Props) {
	const mapaRef = useRef<MapView>(null);
	const { COLORS } = useTheme();
	const ultimaCoordenada = coordenadas[coordenadas.length - 1];

	function aoCarregarMapa() {
		if (coordenadas.length > 1) {
			mapaRef.current?.fitToSuppliedMarkers(["partida", "chegada"], {
				edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
			});
		}
	}

	return (
		<MapView
			ref={mapaRef}
			provider={PROVIDER_GOOGLE}
			style={{ width: "100%", height: 200 }}
			region={{
				latitude: ultimaCoordenada.latitude,
				longitude: ultimaCoordenada.longitude,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}}
			{...rest}
			onMapLoaded={aoCarregarMapa}
		>
			<Marker identifier="partida" coordinate={coordenadas[0]}>
				<CaixaIcone tamanho="pequeno" icone="car" />
			</Marker>
			{coordenadas.length > 1 && (
				<>
					<Marker identifier="chegada" coordinate={ultimaCoordenada}>
						<CaixaIcone tamanho="pequeno" icone="flag-checkered" />
					</Marker>

					<Polyline coordinates={[...coordenadas]} strokeColor={COLORS.GRAY_700} strokeWidth={7} />
				</>
			)}
		</MapView>
	);
}
