// checkout.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private checkoutData: any = {};

  saveData(data: any) {
    this.checkoutData = data;
    console.log('Dados salvos:', this.checkoutData);
  }

  getData() {
    return this.checkoutData;
  }
}
