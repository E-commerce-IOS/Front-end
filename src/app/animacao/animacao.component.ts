import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animacao',
  standalone: true,
  imports: [],
  templateUrl: './animacao.component.html',
  styleUrl: './animacao.component.css'
})
export class AnimacaoComponent implements OnInit {
  isActive = false; // Estado inicial (invisível)

  ngOnInit(): void {
    // Ativa a animação após 0.5 segundos
    setTimeout(() => {
      this.isActive = true;
    }, 500);
  }
}

