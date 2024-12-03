import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  login() {
    if (this.email && this.password) {
      alert(`Bem-vindo, ${this.email}!`);
    } else {
      alert('Login e/ou senha inválidos(s).Tente novamente.');
    }
  }
}
