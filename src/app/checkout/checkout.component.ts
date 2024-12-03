import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CarrinhoService } from '../services/carrinho.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  cardName: string;
  cardCPF: string;
  paymentMethod: 'credit' | 'debit' | 'installments' | 'pix';
  installments: number; // Número de parcelas
  qrCode: string; // URL ou base64 string para QR code
  amount: number; // Total da compra
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm = {
    userDetails: {
      name: '',
      surname: '',
      birthdate: '',
      phone: '',
      email: ''
    },
    address: {
      zip: '',
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
      amount: 0 // Valor total da compra
    }
  };

  currentStep = 1;
  products$: Observable<Product[]>; // Observable para produtos no carrinho
  qrCodeImage: string = ''; // Placeholder para a imagem do QR code
  totalAmount$: Observable<number>; // Observable para o total da compra
  itemCount$: Observable<number>; // Observable para quantidade total de itens no carrinho

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

 

  // Geração do QR Code (exemplo estático)
  generateQRCode(): void {
    this.qrCodeImage = 'https://example.com/qrcode.png'; // Substitua pela lógica real
  }

  // Confirmação do pedido
  confirmOrder(): void {
    alert('Seu pedido foi confirmado! Agradecemos pela sua compra.');
    this.carrinhoService.clearCart();
  }

  // Verifica se o método de pagamento é cartão
  isCardPayment(): boolean {
    return (
      this.checkoutForm.payment.type === 'credit' ||
      this.checkoutForm.payment.type === 'debit'
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
}
