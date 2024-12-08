import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-animacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animacao.component.html',
  styleUrls: ['./animacao.component.css']
})
export class AnimacaoComponent implements OnInit {
  isActive = false;
  isMobile = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Só executa essa parte no navegador
      setTimeout(() => (this.isActive = true), 500);
      this.isMobile = window.innerWidth <= 768;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }
}
