import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  [x: string]: any;
  private items = new BehaviorSubject<any[]>([]);
  public items$ = this.items.asObservable();
  private isOpen = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpen.asObservable();

  constructor() {}

  addItem(item: any): void {
    const currentItems = this.items.value;
    
    // Verifica se o item já existe no carrinho
    const existingItem = currentItems.find(i => i.id === item.id);
    if (existingItem) {
      // Se o item já existir, apenas incrementa a quantidade
      existingItem.quantity += 1;
    } else {
      // Se o item for novo, inicializa com quantity = 1 e atribui o tipo
      item.quantity = 1;
      if (!item.type) {
        item.type = 'generic';  // Tipo padrão caso não tenha tipo
      }
      currentItems.push(item);
    }
  
    // Atualiza os itens no carrinho
    this.items.next([...currentItems]);
  }
  

  removeItem(index: number): void {
    const currentItems = this.items.value;
    currentItems.splice(index, 1);
    this.items.next([...currentItems]);
  }

  toggleCart(): void {
    this.isOpen.next(!this.isOpen.value);
  }

  clearCart(): void {
    this.items.next([]);
  }

  // Função para aumentar a quantidade de um item
  increaseQuantity(index: number): void {
    const currentItems = this.items.value;
    currentItems[index].quantity += 1;
    this.items.next([...currentItems]);
  }

  // Função para diminuir a quantidade de um item
  decreaseQuantity(index: number): void {
    const currentItems = this.items.value;
    if (currentItems[index].quantity > 1) {
      currentItems[index].quantity -= 1;
      this.items.next([...currentItems]);
    }
  }

  // Função para alterar o tamanho de um item, se for uma roupa
  updateSize(index: number, size: string): void {
    const currentItems = this.items.value;
    if (currentItems[index].type === 'clothing') {
      currentItems[index].size = size;
      this.items.next([...currentItems]);
    }
  }

   // Método para calcular o total do carrinho
   calculateTotal(): number {
    const currentItems = this.items.value;
    return currentItems.reduce((total, item) => {
      return total + (item.price * item.quantity);  // Multiplica o preço pela quantidade de cada item
    }, 0);
  }

  getItems(): any[] {
    return this.items.value;
  }

  updateItems(items: any[]): void {
    this.items.next(items);
  }
}

