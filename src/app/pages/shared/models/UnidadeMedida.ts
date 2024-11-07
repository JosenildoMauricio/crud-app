export enum UnidadeMedida {
  KILOGRAMA = "Kg",
  METRO = "Metro",
  UNIDADE = "Unidade",
  PECA = "Peça",
  CAIXA = "Caixa",
  PACOTE = "Pacote"
}

export const UnidadeMedidaToStringMapping: Record<UnidadeMedida, string> = {
  [UnidadeMedida.KILOGRAMA]: "Kg",
  [UnidadeMedida.METRO]: "Metro",
	[UnidadeMedida.UNIDADE]: "Unidade",
	[UnidadeMedida.PECA]: "Peça",
	[UnidadeMedida.CAIXA]: "Caixa",
	[UnidadeMedida.PACOTE]: "Pacote"
};

export const StringToEnumMapping: Record<string, UnidadeMedida> = {
  ["Kg"]: UnidadeMedida.KILOGRAMA,
  ["Metro"]: UnidadeMedida.METRO,
	["Unidade"]: UnidadeMedida.UNIDADE,
	["Peça"]: UnidadeMedida.PECA,
	["Caixa"]: UnidadeMedida.CAIXA,
	["Pacote"]: UnidadeMedida.PACOTE
};

export function convertStrToEnum(str: string):
  UnidadeMedida | string {
    switch (str) {
      case "Kg":
          return UnidadeMedida.KILOGRAMA;
      case "Metro":
        return UnidadeMedida.METRO;
      case "Unidade":
        return UnidadeMedida.UNIDADE;
      case "Peça":
        return UnidadeMedida.PECA;
      case "Caixa":
        return UnidadeMedida.CAIXA;
      case "Pacote":
        return UnidadeMedida.PACOTE;
      default:
        return "VALOR_DESCONHECIDO";
  }
}