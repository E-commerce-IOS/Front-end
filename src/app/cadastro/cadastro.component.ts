import { Component } from '@angular/core';
import { Router } from '@angular/router';// Ajuste o caminho conforme necessário
import { Usuario } from '../models/usuario.model'; // Ajuste o caminho conforme necessário
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  nomeUsuario: string = '';
  emailUsuario: string = '';
  senhaUsuario: string = '';
  confirmarSenha: string = '';
  telefoneUsuario: string = '';
  enderecoUsuario: string = '';
  administrador: boolean = false; // Você pode adicionar um campo para determinar se é administrador

  constructor(private authService: AuthService, private router: Router) {}

  // Lógica de cadastro
  cadastro() {
    if (this.nomeUsuario && this.emailUsuario && this.senhaUsuario && this.confirmarSenha && this.telefoneUsuario && this.enderecoUsuario) {
      if (this.senhaUsuario === this.confirmarSenha) {
        const usuario: Usuario = {
          nomeUsuario: this.nomeUsuario,
          emailUsuario: this.emailUsuario,
          senhaUsuario: this.senhaUsuario.substring(0, 10), // Limita a senha a 10 caracteres
          telefoneUsuario: this.telefoneUsuario,
          enderecoUsuario: this.enderecoUsuario,
          administrador: this.administrador
        };

        // Chama o método de registro do serviço
        this.authService.register(usuario).subscribe({
          next: (response) => {
            alert(`Cadastro realizado com sucesso, ${this.nomeUsuario}!`);
            this.router.navigate(['/login']); // Redireciona para a página de login após o cadastro
          },
          error: (err) => {
            console.error('Erro ao cadastrar usuário:', err);
            alert('Erro ao realizar o cadastro. Tente novamente.');
          }
        });
      } else {
        alert('As senhas não correspondem.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}
