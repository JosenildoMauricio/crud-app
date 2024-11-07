import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ICategoria } from '../../pages/shared/models/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiurl = 'http://localhost:8080/api/categorias';
  constructor(private http: HttpClient) {}

  buscaTodosCategoria(): Observable<any> {
    return this.http.get<ICategoria[]>(`${this.apiurl}`);
  }

  buscaCategoria(id: number): Observable<ICategoria> {
    return this.http.get<ICategoria>(`${this.apiurl}/${id}`);
  }

  criaCategoria(categoria: ICategoria): Observable<any> {
    return this.http.post(`${this.apiurl}`, categoria);
  }

  atualizaCategoria(id: number, categoria: ICategoria): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, categoria);
  }

  deletaCategoria(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`);
  }
}
