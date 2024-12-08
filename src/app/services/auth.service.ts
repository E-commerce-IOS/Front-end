import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { UsuarioLogin } from '../models/usuarioLogin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.api + '/usuario/logar'; // Endpoint de login

  constructor(private httpClient: HttpClient) {}

  // Método de login
  login(usuario: UsuarioLogin): Observable<any> {
    return this.httpClient.post<any>(this.url, usuario).pipe(
      tap(response => {
        if (response.token) {
          // Armazenando o token no localStorage
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  // Método para verificar se o usuário está logado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  // Método de logout
  logout(): void {
    // Remover o token ao fazer logout
    localStorage.removeItem('token');
  }
}
