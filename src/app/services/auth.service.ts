import { UsuarioLogin } from './../models/usuarioLogin.model';
import { Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario.model";

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
  
    private registerUrl = environment.api + '/usuario/cadastrar'; // Endpoint de cadastro
  
    constructor(private httpClient: HttpClient) {}
  
    // Método de login
    login(usuario: { emailUsuario: string; senhaUsuario: string }): Observable<any> {
        const loginUrl = `${environment.api}/usuario/logar`;
        return this.httpClient.post<any>(loginUrl, usuario).pipe(
          tap((response) => {
            if (response.token) {
              localStorage.setItem('token', response.token);
              sessionStorage.setItem('user', JSON.stringify(response));
            }
          })
        );
      }
      
      
  
    // Método de cadastro
    register(usuario: Usuario): Observable<any> {
      return this.httpClient.post<any>(this.registerUrl, usuario);
    }
  
    isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      return token ? true : false;
    }
  
    logout(): void {
      localStorage.removeItem('token');
    }
  }
  