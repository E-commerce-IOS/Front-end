import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from '../models/usuarioLogin.model';
import { CheckoutService } from '../services/checkout.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private authService: AuthService, private router: Router,
    private checkoutService: CheckoutService
  ) {}

  login(email: string, senha: string) {
    this.authService.login({ emailUsuario: email, senhaUsuario: senha }).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso!', response);
        alert('Login realizado com sucesso!')
        const user = response.user; // Certifique-se de que os dados do usuário estão disponíveis na resposta.
        
        // Salvar os dados do usuário no CheckoutService
        this.checkoutService.setUserInfo({
          name: user.nomeUsuario,
          email: user.emailUsuario,
          phone: user.telefoneUsuario,
          address: user.enderecoUsuario,
          admin: user.administrador
        });
        this.router.navigate(['/perfil']); 
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Erro ao realizar login. Verifique as credenciais.');
      },
    });
  }
}