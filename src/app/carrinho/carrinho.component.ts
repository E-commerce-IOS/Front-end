import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../../src/app/services/carrinho.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  type: 'clothing' | 'other';
  image: string;
}

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  items$!: Observable<CartItem[]>; 
  isOpen$!: Observable<boolean>; 
  total: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router // Injeção do Router
  ) {}
  ngOnInit(): void {
    this.items$ = this.carrinhoService.items$;
    this.isOpen$ = this.carrinhoService.isOpen$;

   
    this.carrinhoService.items$.subscribe(() => {
      this.updateTotal();
    });
  }

  updateTotal(): void {
    const items = this.carrinhoService.getItems();
    this.total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0); 
  }

  closeCart(): void {
    this.carrinhoService.toggleCart();
  }

  clearCart(): void {
    this.carrinhoService.clearCart();
  }

  removeItem(index: number): void {
    this.carrinhoService.removeItem(index);
  }

  increaseQuantity(index: number): void {
    const items = this.carrinhoService.getItems();
    const item = items[index];
    
    if (item && !isNaN(item.quantity)) {
      item.quantity += 1;
      this.carrinhoService.updateItems(items);
      this.updateTotal();  
    }
  }

  decreaseQuantity(index: number): void {
    const items = this.carrinhoService.getItems();
    const item = items[index];
    
    if (item && !isNaN(item.quantity) && item.quantity > 1) {
      item.quantity -= 1;
      this.carrinhoService.updateItems(items);
      this.updateTotal();  
    }
  }

  updateSize(index: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const size = target.value;
      this.carrinhoService.updateSize(index, size);
    }
  }


}
