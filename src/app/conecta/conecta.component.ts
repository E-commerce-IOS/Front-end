import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-conecta',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule ],
  templateUrl: './conecta.component.html',
  styleUrl: './conecta.component.css'
})
export class ConectaComponent {

}
