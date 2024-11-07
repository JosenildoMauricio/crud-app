import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IProduto } from '../../pages/shared/models/Produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  apiurl = 'http://localhost:8080/api/produtos';
  constructor(private http: HttpClient) {}

  buscaTodosProduto(): Observable<any> {
    return this.http.get<IProduto[]>(`${this.apiurl}`);
  }

  buscaProduto(id: number): Observable<IProduto> {
    return this.http.get<IProduto>(`${this.apiurl}/${id}`);
  }

  criaProduto(produto: IProduto): Observable<any> {
    return this.http.post(`${this.apiurl}`, produto);
  }

  atualizaProduto(id: number, produto: IProduto): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, produto);
  }

  deletaProduto(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`);
  }
}
