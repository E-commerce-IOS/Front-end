import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private userInfo: any | null = null;
  
  
  private checkoutData: {
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
  setUserInfo(user: { name: string; email: string; phone: string; address: string, admin: boolean }) {
    this.userInfo = user;
    console.log('Usuário salvo:', this.userInfo); 
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
    console.log('Dados do usuário recuperados:', this.userInfo); // Adicionando log para verificar
    return this.userInfo;
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
