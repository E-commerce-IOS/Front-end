import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent {
  
  slides = [
    { img: 'img/05.JPG', alt: 'Imagem de uma mulher branca', name: 'Allana Lu', date: 'Julho 5, 2023', comment: 'Ótimo atendimento, chegou super rápido.' },
    { img: 'img/01.JPG', alt: 'Imagem de uma mulher negra', name: 'Zuri', date: 'Agosto 18, 2023', comment: 'Desde o primeiro contato, fui tratada com muita atenção e profissionalismo.' },
    { img: 'img/02.JPG', alt: 'Imagem do homem que pertence ao grupo LGBTQ+', name: 'Lior', date: 'Janeiro 8, 2024', comment: 'Ótimos produtos, recomendarei a outras pessoas.' },
    { img: 'img/03.JPG', alt: 'Imagem do homem negro', name: 'Ember', date: 'Abril 26, 2024', comment: 'Os produtos chegaram bem embalados e em ótimo estado.' },
    { img: 'img/06.JPG', alt: 'Imagem de uma mulher oriental', name: 'Lian', date: 'Julho 30, 2024', comment: 'Fiquei muito satisfeita com a qualidade dos produtos.' },
    { img: 'img/04.JPG', alt: 'Imagem de uma jovem negra', name: 'Aminata', date: 'Agosto 5, 2024', comment: 'Impressionada, desde a navegação no site até o recebimento do produto. ' }
  ];
  
  currentIndex = 0;
  isMobile: boolean = false;

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
  }

  // Detecta se o dispositivo é móvel ou não
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  get transform() {
    // Se for celular (telas pequenas), move 50% por vez (para mostrar 2 imagens)
    return `translateX(-${this.currentIndex * (this.isMobile ? 50 : 33.33)}%)`; // 50% para 2 slides no celular
  }

  next() {
    // Se for celular (telas pequenas), avança por 2 slides por vez
    if (this.isMobile) {
      if (this.currentIndex < this.slides.length - 2) {
        this.currentIndex += 2;
      }
    } else {
      // Se for desktop/notebook, avança por 3 slides (33.33% por vez)
      if (this.currentIndex < this.slides.length - 3) {
        this.currentIndex += 3;
      }
    }
  }

  prev() {
    // Se for celular (telas pequenas), volta por 2 slides por vez
    if (this.isMobile) {
      if (this.currentIndex > 0) {
        this.currentIndex -= 2;
      }
    } else {
      // Se for desktop/notebook, volta por 3 slides (33.33% por vez)
      if (this.currentIndex > 0) {
        this.currentIndex -= 3;
      }
    }
  }
}
