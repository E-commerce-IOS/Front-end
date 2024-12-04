import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarrinhoService } from './services/carrinho.service';
import { CarrinhoComponent } from "./carrinho/carrinho.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, CarrinhoComponent],
  providers: [CarrinhoService],  // Adiciona o serviço aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit {
  menuActive = false; // Controle do menu mobile
  isMobile = false; // Indica se está em dispositivo móvel

  constructor(
    public carrinhoService: CarrinhoService,
    @Inject(PLATFORM_ID) private platformId: Object // Injeta o identificador da plataforma
  ) {}

  ngOnInit() {
    this.checkScreenSize(); // Verifica o tamanho da tela ao carregar
  }

  // Detecta mudanças no tamanho da tela
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  // Verifica se a tela é mobile (menor que 1024px)
  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) { // Verifica se está no navegador
      this.isMobile = window.innerWidth < 1024; // Verifica se é mobile
      if (!this.isMobile) {
        this.menuActive = false; // Garante que o menu mobile feche ao voltar para desktop
      }
    }
  }

  // Abre/fecha o menu lateral
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  // Fecha o menu ao clicar em um link
  closeMenu() {
    this.menuActive = false;
  }

  // Controla a visibilidade da navbar desktop no scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) { // Verifica se está no navegador
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('visible'); // Exibe a navbar ao scrollar
      } else {
        navbar?.classList.remove('visible'); // Esconde a navbar ao voltar para o topo
      }
    }
  }

  comprar(): void {
    const produto = { name: 'Produto Teste', price: 100 };
    this.carrinhoService.addItem(produto);
  }
}
