import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../app/services/product.service';
import { DecimalPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../app/services/carrinho.service';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { Cor } from '../models/cor.model';
import { Tamanho } from '../models/tamanho.model';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css'],
  providers: [DecimalPipe],
  imports: [CommonModule],
})
export class DetalhesProdutoComponent implements OnInit {
  product: Item | null = null;
  formattedPrice!: string;
  selectedSize:  Tamanho| string = '';
  selectedColor: Cor | string = '';
  showSizeGuide: boolean = false; // Variável para controlar a exibição do popup
  sizeGuideImage: string = 'img/tabela-medida.png'; // Caminho da imagem da tabela de medidas
  

  @ViewChild('imageContainer', { static: false }) imageContainer!: ElementRef;
  @ViewChild('mainImage', { static: false }) mainImage!: ElementRef;
  @ViewChild('zoomLens', { static: false }) zoomLens!: ElementRef;

  // Variáveis para controle do modal
  showModal: boolean = false;
  modalImage: string = ''; // Armazena o caminho da imagem para exibir no modal

  constructor(
    private route: ActivatedRoute,
    private productService: ItemService,
    private decimalPipe: DecimalPipe,
    private router: Router,
    private carrinhoService: CarrinhoService,
  ) {}



  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails(id);
  }

   // Método para carregar detalhes do produto da API
   loadProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe((item: Item) => {
    
      this.product = item;
      this.formattedPrice = this.decimalPipe.transform(this.product.preco, '1.2-2') || '';
      this.selectedColor = this.product.cor?.nome || '';
      this.selectedSize = this.product.tamanho || '';
    });
  }
  
  get sizes(): string[] {
    const descricao = this.product?.tamanho?.descricao;
    return descricao ? [descricao] : [];
  }


  selectSize(size: string) {
    this.selectedSize = size;
  }

  changeColor(color: string): void {
    this.selectedColor = color;  
  }

  // Método para gerenciar a lógica da lupa
  onMouseMove(event: MouseEvent) {
    const { left, top, width, height } = this.imageContainer.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const mouseY = event.clientY - top;
 
    // Tamanho da lente de zoom
    const lensSize = 100; // Tamanho da lupa
    const lensX = mouseX - lensSize / 2;
    const lensY = mouseY - lensSize / 2;

    // Limitar a posição da lupa para que ela não saia da imagem
    this.zoomLens.nativeElement.style.left = `${Math.min(Math.max(lensX, 0), width - lensSize)}px`;
    this.zoomLens.nativeElement.style.top = `${Math.min(Math.max(lensY, 0), height - lensSize)}px`;

    // Calcula o zoom da imagem
    this.mainImage.nativeElement.style.transform = `scale(2)`; // Aumenta a imagem

    // Ajusta a origem da imagem para a posição da lupa
    this.mainImage.nativeElement.style.transformOrigin = `${(mouseX / width) * 100}% ${(mouseY / height) * 100}%`;
    
    console.log('Width:', width, 'Height:', height);
  }

  onMouseEnter() {
    // Exibe a lupa quando o mouse entra na área da imagem
    this.zoomLens.nativeElement.style.display = 'block';
  }

  onMouseLeave() {
    // Esconde a lupa quando o mouse sai da área da imagem
    this.zoomLens.nativeElement.style.display = 'none';
    this.mainImage.nativeElement.style.transform = 'scale(1)';
  }

  // Método de compra ajustado para não receber parâmetros
  comprar(): void {
    if (this.product) {
      const produtoParaCarrinho = {
        id: this.product.idItem,
        name: this.product.produto.nomeProduto,
        price: this.product.preco,
        type: this.product.produto.categoria,
        image: this.product.imagemProduto,
        size: this.selectedSize || null, // Adicionando a seleção do tamanho
        quantity: 1,
      };
      this.carrinhoService.toggleCart(); // Exibe ou oculta o carrinho
      this.carrinhoService.addItem(produtoParaCarrinho); // Adiciona o produto ao carrinho
    }
  } 



}
