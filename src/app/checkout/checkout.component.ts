import { Component, OnInit, NgModule } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CarrinhoService } from '../services/carrinho.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule, RouterOutlet } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  sizes: string[];
  colors: string[];
  quantity: number; // Quantidade do produto no carrinho
}

interface UserDetails {
  name: string;
  surname: string;
  birthDate: string;
  phone: string;
  email: string;
}

interface Address {
  zipCode: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  notes: string;
}

interface Payment {
  type: 'credit' | 'debit' | 'installments' | 'pix'; // Tipo de pagamento
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  installments: number;
  qrCode: string;
  amount: number;
  discount: number;
  totvsPoints: number;
  paymentMethod: 'credit' | 'debit' | 'installments' | 'pix';
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm = {
    userDetails: {
      name: '',
      surname: '',
      birthDate: '',
      phone: '',
      email: ''
    },
    address: {
      zipCode: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',
      notes: ''
    },
    payment: {
      type: '', // 'credit', 'debit', 'installments', 'pix'
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      installments: 1,
      qrCode: '', // Para Pix
      amount: 0, // Valor total da compra
      discount: 0,
      totvsPoints: 0,
      paymentMethod: 'credit' // Valor inicial para o método de pagamento
    },
    shipping: {
      cost: 0, // Inicialmente, custo do frete é 0
      estimatedDelivery: '', // Inicialmente, tempo de entrega é vazio
      zipCode: ''
    }
  };

  currentStep = 1;
  products$: Observable<Product[]>; // Observable para produtos no carrinho
  qrCodeImage: string = ''; // Placeholder para a imagem do QR code
  totalAmount$: Observable<number>; // Observable para o total da compra
  itemCount$: Observable<number>; // Observable para quantidade total de itens no carrinho
  shippingCost: number = 0; // Custo do frete
  pointsDiscount: number = 0; // Desconto de pontos

  constructor(
    private productService: ProductService,
    private carrinhoService: CarrinhoService
  ) {
    // Obtém os produtos no carrinho
    this.products$ = this.carrinhoService.items$;

    // Calcula o total da compra
    this.totalAmount$ = this.products$.pipe(
      map(products =>
        products.reduce((total, item) => total + item.price * item.quantity, 0)
      )
    );

    // Calcula o número total de itens no carrinho
    this.itemCount$ = this.products$.pipe(
      map(products =>
        products.reduce((total, item) => total + item.quantity, 0)
      )
    );
  }

  ngOnInit(): void {
    // Inscreve-se para atualizar o total dinamicamente
    this.totalAmount$.subscribe(total => {
      this.checkoutForm.payment.amount = total;
    });
  }

  nextStep(): void {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  generateQRCode(): void {
    const paymentAmount = this.checkoutForm.payment.amount;
    if (this.checkoutForm.payment.paymentMethod === 'pix') {
      this.qrCodeImage = `https://api.qrserver.com/v1/create-qr-code/?data=PixPayment:${paymentAmount}&size=150x150`;
      this.checkoutForm.payment.qrCode = this.qrCodeImage;
    }
  }

  // Confirmação do pedido
  confirmOrder(): void {
    alert('Seu pedido foi confirmado! Agradecemos pela sua compra.');
    this.carrinhoService.clearCart();
  }

  // Verifica se o método de pagamento é cartão
  isCardPayment(): boolean {
    return (
      this.checkoutForm.payment.paymentMethod === 'credit' ||
      this.checkoutForm.payment.paymentMethod === 'debit'
    );
  }

  // Detalhes do parcelamento
  getInstallmentDetails() {
    const installments = this.checkoutForm.payment.installments || 1;
    const amount = this.checkoutForm.payment.amount || 0;
    const installmentDetails = [];
    if (installments > 0 && amount > 0) {
      const installmentValue = (amount / installments).toFixed(2);
      for (let i = 1; i <= installments; i++) {
        installmentDetails.push({
          installmentNumber: i,
          value: installmentValue
        });
      }
    }
    return installmentDetails;
  }

  // Método para calcular o frete de forma independente do CEP
  calculateShipping(): void {
    // Simulação de cálculo de frete, independentemente do CEP
    this.checkoutForm.shipping.cost = 15.0; // Um valor fixo para demonstração
    this.checkoutForm.shipping.estimatedDelivery = '2-3 dias úteis'; // Exemplo de tempo estimado
    alert(`O frete calculado é R$ ${this.checkoutForm.shipping.cost.toFixed(2)} com entrega em ${this.checkoutForm.shipping.estimatedDelivery}`);
  }

  // Método para aplicar o desconto de pontos
  applyPointsDiscount(): void {
    const points = this.checkoutForm.payment.totvsPoints;
    const discountPer1000Points = 10; // Desconto de R$ 10 para cada 1000 pontos
    const totalAmount = this.checkoutForm.payment.amount; // Total dos itens do checkout

    if (points && points > 0 && totalAmount > 0) {
      // Calcula o desconto máximo com base na quantidade de pontos
      const possibleDiscount = Math.floor(points / 1000) * discountPer1000Points;
      // Aplica o desconto, garantindo que não ultrapasse o total do checkout
      this.pointsDiscount = Math.min(possibleDiscount, totalAmount);
      this.checkoutForm.payment.discount = this.pointsDiscount;

      // Calcula o novo total após a aplicação do desconto
      const totalWithDiscount = totalAmount - this.pointsDiscount;

      // Exibe o alerta com o valor do desconto e o total atualizado
      alert(`Desconto de pontos aplicado: R$ ${this.pointsDiscount.toFixed(2)}\nTotal com desconto: R$ ${totalWithDiscount.toFixed(2)}`);
    } else {
      this.pointsDiscount = 0;
      alert(`Desconto de pontos não aplicado. Total do checkout: R$ ${totalAmount.toFixed(2)}`);
    }
  }

  validateDeliveryDate(): boolean {
    // Check if `estimatedDelivery` can be converted into a valid Date
    const estimatedDeliveryDate = new Date(this.checkoutForm.shipping.estimatedDelivery);
    const today = new Date();
  
    if (!isNaN(estimatedDeliveryDate.getTime()) && estimatedDeliveryDate > today) {
      return true; // Estimated delivery date is valid
    } else {
      alert('A data de entrega deve ser uma data futura.');
      return false;
    }
  }
}
