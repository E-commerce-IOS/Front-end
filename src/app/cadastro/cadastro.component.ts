import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  email: string = '';
  criarsenha: string = '';
  confirmarsenha: string = '';

  login() {
    if (this.email && this.criarsenha && this.confirmarsenha) {
      if (this.criarsenha === this.confirmarsenha) {
        alert(`Cadastro realizado com sucesso, ${this.email}!`);
      } else {
        alert('As senhas não correspondem.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

    // Confirmação do cadastro
    confirmOrder(): void {
      alert('Cadastro realizado com sucesso! Agora você pode acessar sua conta');
    }
}