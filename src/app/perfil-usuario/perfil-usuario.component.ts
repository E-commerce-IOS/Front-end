import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../services/carrinho.service';
import { CheckoutService } from '../services/checkout.service';

// Interface para tipar as informações do usuário
interface User {
  photo: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  user: User = {
    photo: '', // Inicializa com uma string vazia para evitar erros de tipo
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  isEditing = false;
  orderHistory: any[] = [];
  checkoutSummary: any = null;

  constructor(
    private carrinhoService: CarrinhoService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadOrderHistory();
    this.loadCheckoutSummary();
  }

  // Carrega informações do usuário do serviço de checkout
  loadUserInfo() {
    try {
      const userInfo = this.checkoutService.getUserInfo();
      if (userInfo) {
        this.user = {
          ...userInfo,
          photo: userInfo['photo'] || '', // Garante que photo seja uma string vazia se estiver ausente
        };
      }
    } catch (error) {
      console.error('Erro ao carregar informações do usuário', error);
    }
  }

  // Carrega histórico de pedidos baseado no carrinho
  loadOrderHistory() {
    try {
      this.orderHistory = this.carrinhoService.getItems().map((item, index) => ({
        id: index + 1,
        item: item.name,
        date: new Date().toLocaleDateString(),
        status: 'A caminho',
      }));
    } catch (error) {
      console.error('Erro ao carregar histórico de pedidos', error);
    }
  }

  // Carrega o resumo do checkout
  loadCheckoutSummary() {
    try {
      this.checkoutSummary = this.checkoutService.getAllCheckoutData();
    } catch (error) {
      console.error('Erro ao carregar resumo do checkout', error);
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.isEditing = false;

    // Salva as informações do usuário no serviço de checkout
    try {
      this.checkoutService.saveUserInfo({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
      });
      alert('Informações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar as informações do usuário', error);
      alert('Erro ao salvar as informações. Por favor, tente novamente.');
    }
  }

  uploadPhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Exibe os detalhes do pedido
  viewOrderDetails(orderId: number) {
    const order = this.orderHistory.find(o => o.id === orderId);
    if (order) {
      alert(`Detalhes do Pedido:\n\nItem: ${order.item}\nData: ${order.date}\nStatus: ${order.status}`);
    } else {
      alert('Pedido não encontrado.');
    }
  }

  // Limpa histórico de pedidos
  clearOrderHistory() {
    this.orderHistory = [];
    alert('Histórico de pedidos limpo.');
  }

  // Simula finalização de pedido e armazena no checkout
  finalizeOrder() {
    try {
      const items = this.carrinhoService.getItems();
      const total = this.carrinhoService.calculateTotal();

      this.checkoutService.saveOrderSummary({
        items,
        total,
      });

      alert('Pedido finalizado com sucesso!');
      this.loadCheckoutSummary();
    } catch (error) {
      console.error('Erro ao finalizar o pedido', error);
      alert('Erro ao finalizar o pedido. Por favor, tente novamente.');
    }
  }
}
