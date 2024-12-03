import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../footer/footer.component"; // Import FormsModule

interface Product {
  image: string;
  id: number;
  name: string;
  description: string;
  price: number;
  type?: string;
  size?: string;
  selectedSize?: string;
}

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FooterComponent],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedFilters: Set<string> = new Set();
  priceRange: number = 250; // Valor inicial da faixa de preço

  constructor(
    private productService: ProductService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products]; // Inicializa com todos os produtos
  }

  comprar(id: number): void {
    const produto = this.products.find(p => p.id === id);
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

  verDetalhes(id: number): void {
    this.router.navigate(['/products', id]);
  }

  updateFilter(category: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const isChecked = target.checked;
      if (isChecked) {
        this.selectedFilters.add(category);
      } else {
        this.selectedFilters.delete(category);
      }
      this.applyFilters();
    }
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      // Verifica se o produto atende aos filtros de categoria
      const matchesCategory = 
        this.selectedFilters.size === 0 || 
        (product.type && this.selectedFilters.has(product.type));
  
      // Verifica se o preço do produto está dentro do intervalo
      const matchesPrice = product.price <= this.priceRange;
  
      return matchesCategory && matchesPrice;
    });
  }
  

  onPriceRangeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.priceRange = +target.value; // Converte o valor para um número
      console.log('Faixa de preço atual:', this.priceRange); // Debug para verificar a faixa de preço
      this.applyFilters(); // Aplica os filtros após a mudança
    }
  }

  clearFilter(): void {
    this.selectedFilters.clear();
    this.priceRange = 500; // Resetar faixa de preço para o valor inicial
    this.filteredProducts = [...this.products]; // Mostra todos os produtos novamente
  }

  showFilter: boolean = false;

  toggleFilter() {
    this.showFilter = !this.showFilter;
  } 
}
