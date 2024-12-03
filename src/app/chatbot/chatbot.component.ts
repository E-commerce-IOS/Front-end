import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent  {
  isChatOpen = false; // O chat começa fechado
  userMessage = '';
  showIntroMessage = true; // O SVG de introdução aparece ao carregar a página
  chatHistory: { sender: string; message: string }[] = [];

  predefinedResponses: Record<string, string> = {
    '1': 'Você escolheu a opção 1: Informações sobre o produto.',
    '2': 'Você escolheu a opção 2: Suporte técnico.',
    '3': 'Você escolheu a opção 3: Fale com um atendente.',
    '4': 'Você escolheu a opção 4: Outras dúvidas.',
  };

  ngOnInit() {
    this.addBotMessage(
      'Olá! Sou a Tita. Escolha uma das opções abaixo digitando o número correspondente: <br>1. Informações sobre o produto<br>2. Suporte técnico<br>3. Fale com um atendente<br>4. Outras dúvidas'
    );
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;

    if (this.isChatOpen) {
      this.showIntroMessage = false; // O SVG desaparece ao abrir o chat
    }
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatHistory.push({ sender: 'user', message: this.userMessage });
      const response = this.predefinedResponses[this.userMessage] || 'Desculpe, não entendi sua escolha.';
      this.addBotMessage(response);
      this.userMessage = '';
    }
  }

  private addBotMessage(message: string) {
    this.chatHistory.push({ sender: 'bot', message });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showIntroMessage = false; 
  }
}