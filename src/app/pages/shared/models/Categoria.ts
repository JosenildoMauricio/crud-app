export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface ICategoria {
  id?: number;
  nome: string;
}

export interface IErro {
  timestamp: Date,
  status: string,
  title: string,
  detail: string,
  userMessage: string
}
