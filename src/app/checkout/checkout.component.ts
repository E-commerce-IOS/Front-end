import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CarrinhoService } from '../services/carrinho.service';
import { CepService } from '../services/cep.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  sizes: string[];
  colors: string[];
  quantity: number; // Quantity in the cart
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
  type: 'credit' | 'debit' | 'installments' | 'pix'; // Payment type
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
      qrCode: '', // For Pix
      amount: 0, // Total purchase amount
      discount: 0,
      totvsPoints: 0,
      paymentMethod: 'credit' // Initial payment method value
    },
    shipping: {
      cost: 0, // Initial shipping cost
      estimatedDelivery: '', // Initial delivery time
      zipCode: ''
    }
  };

  currentStep = 1;
  products$: Observable<Product[]>; // Observable for cart items
  qrCodeImage: string = ''; // Placeholder for QR code image
  totalAmount$: Observable<number>; // Observable for total purchase amount
  itemCount$: Observable<number>; // Observable for total item count in cart
  shippingCost: number = 0; // Shipping cost
  pointsDiscount: number = 0; // Points discount
product: any;

  constructor(
    private productService: ProductService,
    private carrinhoService: CarrinhoService,
    private cepService: CepService
  ) {
    this.products$ = this.carrinhoService.items$;
    this.totalAmount$ = this.products$.pipe(
      map(products => products.reduce((total, item) => total + item.price * item.quantity, 0))
    );

    this.itemCount$ = this.products$.pipe(
      map(products => products.reduce((total, item) => total + item.quantity, 0))
    );
  }

  ngOnInit(): void {
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

  confirmOrder(): void {
    // Enhanced confirmation alert
    alert('Seu pedido foi confirmado! Agradecemos pela sua compra. Você receberá um e-mail com os detalhes do pedido.');
    this.carrinhoService.clearCart();
  }

  isCardPayment(): boolean {
    return ['credit', 'debit'].includes(this.checkoutForm.payment.paymentMethod);
  }

  getInstallmentDetails(): { installmentNumber: number; value: string }[] {
    const installments = this.checkoutForm.payment.installments || 1;
    const amount = this.checkoutForm.payment.amount || 0;
    const installmentDetails = [];

    if (installments > 0 && amount > 0) {
      const installmentValue = (amount / installments).toFixed(2);
      for (let i = 1; i <= installments; i++) {
        installmentDetails.push({ installmentNumber: i, value: installmentValue });
      }
    }

    return installmentDetails;
  }

  calculateShipping(): void {
    // Simulated shipping calculation logic for demonstration
    this.checkoutForm.shipping.cost = 15.0;
    this.checkoutForm.shipping.estimatedDelivery = '2-7 dias úteis';

    // Informative alert for the user
    alert(`O frete calculado é R$ ${this.checkoutForm.shipping.cost.toFixed(2)} com entrega em ${this.checkoutForm.shipping.estimatedDelivery}`);
  }

  applyPointsDiscount(): void {
    const points = this.checkoutForm.payment.totvsPoints;
    const discountPer1000Points = 10; // R$ 10 discount per 1000 points
    const totalAmount = this.checkoutForm.payment.amount;

    if (points > 0 && totalAmount > 0) {
      const possibleDiscount = Math.floor(points / 1000) * discountPer1000Points;
      this.pointsDiscount = Math.min(possibleDiscount, totalAmount);
      this.checkoutForm.payment.discount = this.pointsDiscount;

      const totalWithDiscount = totalAmount - this.pointsDiscount;
      alert(`Desconto de pontos aplicado: R$ ${this.pointsDiscount.toFixed(2)}\nTotal com desconto: R$ ${totalWithDiscount.toFixed(2)}`);
    } else {
      this.pointsDiscount = 0;
      alert(`Desconto de pontos não aplicado. Total do checkout: R$ ${totalAmount.toFixed(2)}`);
    }
  }

  validateDeliveryDate(): boolean {
    const estimatedDeliveryDate = new Date(this.checkoutForm.shipping.estimatedDelivery);
    const today = new Date();

    if (!isNaN(estimatedDeliveryDate.getTime()) && estimatedDeliveryDate > today) {
      return true;
    } else {
      alert('A data de entrega deve ser uma data futura.');
      return false;
    }
  }

  onZipCodeBlur(): void {
    if (this.checkoutForm.address.zipCode.length === 8) {
      this.cepService.getAddressByCep(this.checkoutForm.address.zipCode)
        .subscribe(
          data => {
            if (data) {
              this.checkoutForm.address.neighborhood = data.bairro || '';
              this.checkoutForm.address.street = data.logradouro || '';
            }
          },
          error => {
            console.error('Erro ao buscar endereço:', error);
          }
        );
    }
  }
}
