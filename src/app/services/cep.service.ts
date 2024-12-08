import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private readonly baseUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  getAddressByCep(cep: string): Observable<any> {
    const url = `${this.baseUrl}/${cep}/json/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Erro ao buscar o endereço:', error);
        return throwError(() => new Error('Erro ao buscar o endereço.'));
      })
    );
  }
}
