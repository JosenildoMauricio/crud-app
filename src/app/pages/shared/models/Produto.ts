import { UnidadeMedida } from "./UnidadeMedida";
import { ICategoria } from "./Categoria";

export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface IProduto {
  id?: number;
  nome: string;
  valor: number;
  unidadeMedida: UnidadeMedida;
  categoria: ICategoria;
}
