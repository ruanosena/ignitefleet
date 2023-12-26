import "styled-components";
import tema from "../tema";

declare module "styled-components" {
	type TemaType = typeof tema;

	export interface DefaultTheme extends TemaType {}
}
