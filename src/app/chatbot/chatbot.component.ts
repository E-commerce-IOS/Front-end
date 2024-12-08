import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements OnInit {
  isChatOpen = false; // O chat começa fechado
  userMessage = '';
  showIntroMessage = true; // O SVG de introdução aparece ao carregar a página
  chatHistory: { sender: string; message: string }[] = [];
  waitingForSubOption = false; // Controla se o chatbot espera uma subopção


  predefinedResponses: Record<string, string> = {
    '1': `Você escolheu a opção 1.<br>Gostaria de saber mais sobre:<br>
    1. Modelos disponíveis<br>
    2. Especificações técnicas<br>
    3. Preços<br>`,
    '2': 'Você escolheu a opção 2: A entrega do produto será realizada em 2 a 3 dias úteis',
    '3': 'Você escolheu a opção 3: Um de nossos atendentes entrará em contato com você o mais breve possível para ajudar com sua dúvida. <br> Atendimento encerrado. Obrigado por entrar em contato!',
    '4': 'Você escolheu a opção 4: Para outras dúvidas, entre em contato com a gente pelo WhatsApp <a href="https://wa.me/5511994703961" target="_blank">aqui</a>. Estamos prontos para ajudar! <br> Atendimento encerrado. Obrigado por entrar em contato!',
  };


  subOptions: Record<string, string> = {
    '1': ' Temos as categorias Camisetas e Moletom, Infantil e Acessórios <br> Atendimento encerrado. Obrigado por entrar em contato!',
    '2': 'Clique na imagem do modelo desejado para ver as especificações técnicas. <br> Atendimento encerrado. Obrigado por entrar em contato!',
    '3': 'Os preços variam entre R$ 6,50 e R$ 335,00 dependendo do modelo e acessório. <br> Atendimento encerrado. Obrigado por entrar em contato!',
  };


 


  ngOnInit() {
    this.addBotMessage(
      'Olá! Sou a Tita. Escolha uma das opções abaixo digitando o número correspondente: <br>1. Informações sobre o produto<br>2. Qual o prazo de entrega do produto?<br>3. Fale com um atendente<br>4. Outras dúvidas'
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


      if (this.waitingForSubOption && this.subOptions[this.userMessage]) {
        // Responde à subopção escolhida
        this.addBotMessage(this.subOptions[this.userMessage]);
        this.waitingForSubOption = false; // Resetar a espera por subopção
      } else if (this.predefinedResponses[this.userMessage]) {
        // Responde às opções principais
        const response = this.predefinedResponses[this.userMessage];
        this.addBotMessage(response);


        // Se for a opção 1, ativa a espera por subopção
        if (this.userMessage === '1') {
          this.waitingForSubOption = true;
        }
      } else {
        // Mensagem padrão para entrada inválida
        this.addBotMessage('Desculpe, não entendi sua escolha.');
      }


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


