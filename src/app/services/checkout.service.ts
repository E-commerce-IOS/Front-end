import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private checkoutData: {
    userInfo?: {
      [x: string]: string;
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    paymentInfo?: {
      method: string;
      cardDetails?: {
        cardNumber: string;
        cardHolder: string;
        expirationDate: string;
        cvv: string;
      };
      installments?: number;
    };
    orderSummary?: {
      items: { name: string; price: number; quantity: number }[];
      total: number;
    };
  } = {};

  // Salvar informações do checkout
  saveUserInfo(userInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) {
    this.checkoutData.userInfo = userInfo;
    console.log('Informações do usuário salvas:', this.checkoutData.userInfo);
  }

  savePaymentInfo(paymentInfo: {
    method: string;
    cardDetails?: {
      cardNumber: string;
      cardHolder: string;
      expirationDate: string;
      cvv: string;
    };
    installments?: number;
  }) {
    this.checkoutData.paymentInfo = paymentInfo;
    console.log('Informações de pagamento salvas:', this.checkoutData.paymentInfo);
  }

  saveOrderSummary(orderSummary: {
    items: { name: string; price: number; quantity: number }[];
    total: number;
  }) {
    this.checkoutData.orderSummary = orderSummary;
    console.log('Resumo do pedido salvo:', this.checkoutData.orderSummary);
  }

  // Recuperar informações específicas
  getUserInfo() {
    return this.checkoutData.userInfo;
  }

  getPaymentInfo() {
    return this.checkoutData.paymentInfo;
  }

  getOrderSummary() {
    return this.checkoutData.orderSummary;
  }

  // Recuperar todos os dados do checkout
  getAllCheckoutData() {
    return this.checkoutData;
  }

  // Resetar dados do checkout
  resetCheckoutData() {
    this.checkoutData = {};
    console.log('Dados de checkout resetados.');
  }
}
