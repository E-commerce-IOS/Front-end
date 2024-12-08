import { Component } from '@angular/core';
import { CarrinhoService } from '../../app/services/carrinho.service';

@Component({
  selector: 'app-lancamento',
  standalone: true,
  imports: [],
  templateUrl: './lancamento.component.html',
  styleUrl: './lancamento.component.css'
})
export class LancamentoComponent {
  hovered: boolean[] = [false, false, false, false];

  onHover(index: number, state: boolean) {
    this.hovered[index] = state;
  }
  
   
   produtos = [
    {
      id: 1,
      name: 'Moletom Protheus',
      price: 335,
      type: 'clothing', 
      image: 'img/moletom-protheus.png', 
      size: 'M', 
      selectedSize: ''
    },
    {
      id: 2,
      name: 'Pin Onça Preta',
      price: 10,
      type: 'accessory', 
      image: 'img/pin-protheus.png', 
    },
    {
      id: 3,
      name: 'Camiseta Protheus',
      price: 120,
      type: 'clothing', 
      image: 'path/to/camiseta.jpg', 
      size: 'P', 
    },
    {
      id: 4,
      name: 'Cartela de Adesivos',
      price: 10,
      type: 'accessory', 
      image: 'img/cartela-adesivo.png', 
    },
  ];

  
  selectedSize: string = 'M';

  constructor(private carrinhoService: CarrinhoService) {}

  comprar(id: number): void {
    
    const produto = this.produtos.find(p => p.id === id);

    if (produto) {
      
      const produtoParaCarrinho = {
        id: produto.id,
        name: produto.name,
        price: produto.price,
        type: produto.type,
        image: produto.image,
        size: produto.type === 'clothing' ? produto.selectedSize : null, 
        quantity: 1, 
      };

      
      this.carrinhoService.toggleCart();

      
      this.carrinhoService.addItem(produtoParaCarrinho);
    }
  }
}