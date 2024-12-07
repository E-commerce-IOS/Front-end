import { Component } from '@angular/core';
import { CarrinhoService } from '../../app/services/carrinho.service';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import {  NgFor } from '@angular/common';

@Component({
  selector: 'app-lancamento',
  standalone: true,
  imports: [NgFor],
  templateUrl: './lancamento.component.html',
  styleUrl: './lancamento.component.css'
})
export class LancamentoComponent {
  hovered: number | null = null;

  onHover(index: number, isHovered: boolean) {
    this.hovered = isHovered ? index : null;
  }
  
  items: Item[] = []
   

  constructor(private carrinhoService: CarrinhoService, private itemService: ItemService) {
   this.obterProdutosCadastradosLancamentos()
  }

  obterProdutosCadastradosLancamentos() {
    this.itemService.obterProdutos()
        .subscribe(items => {
           const filteredItems = items.filter(item => item.produto.lancamento === true)
            const uniqueProducts = filteredItems.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.produto.idProduto === item.produto.idProduto
                ))
            );
            this.items = uniqueProducts;
        });
}

  comprar(id: number | undefined): void {
    
    const item = this.items.find(i => i.idItem === id);

    if (item) {
      
      const produtoParaCarrinho = {
        id: item.idItem,
        name: item.produto.nomeProduto,
        price: item.preco,
        image: item.imagemProduto,
        quantity: 1, 
      };

      
      this.carrinhoService.toggleCart();

      
      this.carrinhoService.addItem(produtoParaCarrinho);
    }
  }
}