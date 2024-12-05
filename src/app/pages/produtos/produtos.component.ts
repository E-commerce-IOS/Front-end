import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../footer/footer.component";
import { WindowService } from '../../services/window.service';

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
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedFilters: Set<string> = new Set();
  priceRange: number = 250;

  showPopup: boolean = false;
  isMobile: boolean = false;
  isDesktop: boolean = false;

  constructor(
    private productService: ProductService,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private windowService: WindowService // Injeta o WindowService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];

    // Atualiza o tipo de dispositivo baseado no tamanho da janela
    this.updateDeviceType();

    // Adiciona listener de resize se o objeto `window` estiver disponível
    const nativeWindow = this.windowService.nativeWindow;
    if (nativeWindow) {
      nativeWindow.addEventListener('resize', () => this.updateDeviceType());
    }
  }

  private updateDeviceType(): void {
    const nativeWindow = this.windowService.nativeWindow;
    if (nativeWindow) {
      this.isMobile = nativeWindow.innerWidth <= 768;
      this.isDesktop = !this.isMobile;

      if (!this.isMobile) {
        this.showPopup = false;
      }
    }
  }

  // Restante do código permanece o mesmo
  comprar(id: number): void {
    const produto = this.products.find((p) => p.id === id);
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
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory =
        this.selectedFilters.size === 0 ||
        (product.type && this.selectedFilters.has(product.type));

      const matchesPrice = product.price <= this.priceRange;

      return matchesCategory && matchesPrice;
    });
  }

  onPriceRangeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.priceRange = +target.value;
      console.log('Faixa de preço atual:', this.priceRange);
      this.applyFilters();
    }
  }

  clearFilter(): void {
    this.selectedFilters.clear();
    this.priceRange = 500;
    this.filteredProducts = [...this.products];
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
    console.log('Popup toggled, showPopup:', this.showPopup);
  }

  toggleFilter(): void {
    console.log('Toggle Filter clicked');
    if (this.isMobile) {
      this.togglePopup();
    } else {
      this.showPopup = false;
    }
  }
}
