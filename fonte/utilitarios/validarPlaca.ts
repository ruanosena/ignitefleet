const PLACA_REGEX = "[A-Z]{3}[0-9][0-9A-Z][0-9]{2}";

export function validarPlaca(placa: string) {
	placa = placa.toUpperCase();
	const ehValido = placa.match(PLACA_REGEX);
	return ehValido;
}
