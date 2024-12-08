import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
      { 
        id: 1, 
        name: 'Polo Manga Curta Preta', 
        description: 'Descrição do Produto A', 
        price: 100, 
        image: 'img/1PoloMangaCurtaFundo.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#000000', '#FFFFFF'] // Preto e branco
      },
      { 
        id: 2, 
        name: 'Polo Manga Curta Azul', 
        description: 'Descrição do Produto B', 
        price: 200, 
        image: 'img/2PoloMangaCurtaFundo.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#1E90FF', '#87CEEB'] // Azul royal e azul claro
      },
      { 
        id: 3, 
        name: 'Polo Manga Curta Cinza', 
        description: 'Descrição do Produto C', 
        price: 300, 
        image: 'img/3PoloMangaCurtaFundo.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#808080', '#A9A9A9'] // Cinza escuro e cinza claro
      },
      { 
        id: 4, 
        name: 'Camiseta Harpia Protheus', 
        description: 'Camiseta Harpia Protheus', 
        price: 65.00, 
        image: 'img/CamisaHarpiaProtheus.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G'],
        colors: ['#FF0000', '#FFFF00'] // Vermelho e amarelo
      },
      { 
        id: 5, 
        name: 'Camiseta Harpia Protheus', 
        description: 'Camiseta Harpia Protheus', 
        price: 89.00, 
        image: 'img/CamisetaHarpiaProtheus23.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G'],
        colors: ['#FF4500', '#FFD700'] // Laranja e dourado
      },
      { 
        id: 6, 
        name: 'Camiseta Good Vibes', 
        description: 'Camiseta Good Vibes', 
        price: 89.00, 
        image: 'img/CamisetaGoodVibes.png', 
        type: 'clothing',
        sizes: ['PP', 'P', 'M', 'G', 'GG'],
        colors: ['#008000', '#FFFFFF'] // Verde e branco
      },
      { 
        id: 7, 
        name: 'Camiseta Eat, Sleep, Code, Repeat', 
        description: 'Camiseta Eat, Sleep, Code, Repeat', 
        price: 89.00, 
        image: 'img/CamisetaEatSleepRepeat.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G'],
        colors: ['#000000', '#1E90FF'] // Preto e azul
      },
      { 
        id: 8, 
        name: 'Camiseta Somos a Maior Empresa De Tecnologia Do Brasil', 
        description: 'Camiseta Somos a Maior Empresa De Tecnologia Do Brasil', 
        price: 55.00, 
        image: 'img/CamisetaSomosAmaiorEmpresaTecnologiaDoBrasil.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#FFFFFF', '#FF69B4'] // Branco e rosa
      },
      { 
        id: 9, 
        name: 'Camiseta Faz', 
        description: 'Camiseta Faz', 
        price: 89.00, 
        image: 'img/CamisetaFaz.png', 
        type: 'clothing',
        sizes: ['PP', 'P', 'M', 'G'],
        colors: ['#800080', '#FFD700'] // Roxo e dourado
      },
      { 
        id: 10, 
        name: 'Camiseta Faz', 
        description: 'Camiseta Faz', 
        price: 89.00, 
        image: 'img/CamisetaFaz2.png', 
        type: 'clothing',
        sizes: ['PP', 'P', 'M', 'G'],
        colors: ['#8B0000', '#FF6347'] // Vermelho escuro e coral
      },
      { 
        id: 11, 
        name: 'Camiseta Inspira', 
        description: 'Camiseta Inspira', 
        price: 89.00, 
        image: 'img/CamisetaInspira.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#4682B4', '#B0C4DE'] // Azul aço e azul claro
      },
      { 
        id: 12, 
        name: 'Camiseta 5 Capivaras', 
        description: 'Camiseta 5 Capivaras', 
        price: 89.00, 
        image: 'img/Camiseta5Capivaras.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#964B00', '#FFDAB9'] // Marrom e pêssego
      },
      { 
        id: 13, 
        name: 'Camiseta 5 Capivaras Infantil', 
        description: 'Camiseta 5 Capivaras Infantil', 
        price: 79.00, 
        image: 'img/Camiseta5CapivarasInfantil.png', 
        type: 'infantil',
        sizes: ['2', '4', '6', '8', '10'],
        colors: ['#FF6347', '#FFFFE0'] // Coral e amarelo claro
      },
      { 
        id: 14, 
        name: 'Camiseta Astronauta', 
        description: 'Camiseta Astronauta', 
        price: 95.50, 
        image: 'img/CamisetaAstronauta.png', 
        type: 'clothing',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#000000', '#708090'] // Preto e cinza ardósia
      },
        { 
          id: 15, 
          name: 'Camiseta Astronauta Infantil', 
          description: 'Camiseta Astronauta Infantil', 
          price: 85.50, 
          image: 'img/CamisetaAstronautaInfantil.png', 
          type: 'infantil',
          sizes: ['2', '4', '6', '8', '10'],
          colors: ['#0000FF', '#FFFFFF'] // Azul e branco
        },
        { 
          id: 16, 
          name: 'Meia Capivara', 
          description: 'Meia Capivara', 
          price: 28.90, 
          image: 'img/MeiaCapivara.png', 
          type: 'accessory',
          sizes: ['P', 'M', 'G'],
          colors: ['#A52A2A', '#FFF8DC'] // Marrom e creme
        },
        { 
          id: 17, 
          name: 'Camiseta Padawan Cat', 
          description: 'Camiseta Padawan Cat', 
          price: 89.00, 
          image: 'img/CamisetaPadawanCat.png', 
          type: 'clothing',
          sizes: ['P', 'M', 'G'],
          colors: ['#FFD700', '#FFFFFF'] // Dourado e branco
        },
        { 
          id: 18, 
          name: 'Camiseta Brasil Gigante', 
          description: 'Camiseta Brasil Gigante', 
          price: 99.00, 
          image: 'img/CamisetaBrasilGigante.png', 
          type: 'clothing',
          sizes: ['P', 'M', 'G', 'GG'],
          colors: ['#009739', '#FFCC00'] // Verde e amarelo
        },
        { 
          id: 19, 
          name: 'Bolsa Térmica', 
          description: 'Bolsa Térmica', 
          price: 58.90, 
          image: 'img/BolsaTermica.png', 
          type: 'accessory',
          sizes: ['Único'],
          colors: ['#FF6347', '#FFFFFF'] // Vermelho e branco
        },
        { 
          id: 20, 
          name: 'Jaqueta Corta Vento', 
          description: 'Jaqueta Corta Vento', 
          price: 220.00, 
          image: 'img/JaquetaCortaVento.png', 
          type: 'clothing',
          sizes: ['P', 'M', 'G', 'GG'],
          colors: ['#1E90FF', '#4682B4'] // Azul royal e azul aço
        },
        { 
          id: 21, 
          name: 'Camiseta Linha Protheus Onça Preta', 
          description: 'Camiseta Linha Protheus Onça Preta', 
          price: 110.00, 
          image: 'img/CamisetaLinhaProtheusOncaPreta.png', 
          type: 'clothing',
          sizes: ['P', 'M', 'G'],
          colors: ['#000000', '#FFD700'] // Preto e dourado
        },
        { 
          id: 22, 
          name: 'Pin Linha Protheus Onça Preta', 
          description: 'Pin Linha Protheus Onça Preta', 
          price: 18.90, 
          image: 'img/PinLinhaProtheusOncaPreta.png', 
          type: 'accessory',
          sizes: ['Único'],
          colors: ['#000000', '#FFD700'] // Preto e dourado
        },
        { 
          id: 23, 
          name: 'Cartela De Adesivos Linha Protheus Onça Preta', 
          description: 'Cartela De Adesivos Linha Protheus Onça Preta', 
          price: 12.00, 
          image: 'img/CartelaDeAdesivosLinhaProtheusOncaPreta.png', 
          type: 'accessory',
          sizes: ['Único'],
          colors: ['#FF6347', '#FFFFFF'] // Coral e branco
        },
        { 
          id: 24, 
          name: 'Moletom Linha Protheus Onça Preta', 
          description: 'Moletom Linha Protheus Onça Preta', 
          price: 335.00, 
          image: 'img/Moletom.png', 
          type: 'clothing',
          sizes: ['P', 'M', 'G', 'GG'],
          colors: ['#A52A2A', '#FFD700'] // Marrom e dourado
        },
        { 
          id: 25, 
          name: 'Pin Astronauta', 
          description: 'Pin Astronauta', 
          price: 25.00, 
          image: 'img/PinAstronauta.png', 
          type: 'accessory',
          sizes: ['Único'],
          colors: ['#000000', '#FFFFFF'] // Preto e branco
        },
        { 
          id: 26, 
          name: 'Mochila Toronto', 
          description: 'Mochila Toronto', 
          price: 260.00, 
          image: 'img/MochilaToronto.png', 
          type: 'accessory',
          sizes: ['Único'],
          colors: ['#000080', '#FFFFFF'] // Azul marinho e branco
        },
        { 
          id: 27, 
          name: 'Copo Térmico', 
          description: 'Copo Térmico', 
          price: 89.00, 
          image: 'img/CopoTermico.png', 
          type: 'accessory',
          sizes: ['Único'],
          colors: ['#FF6347', '#FFFFFF'] // Vermelho e branco
        },
        { 
          id: 28, 
          name: 'Garrafa Inox', 
          description: 'Garrafa de aço inox, ideal para manter sua bebida na temperatura ideal.', 
          price: 62.00, 
          image: 'img/GarrafaInox.png', 
          type: 'accessory',
          sizes: ['Único'],
          colors: ['#C0C0C0'] // Prata
        },
        { 
          id: 29, 
          name: 'Garrafa De Vidro', 
          description: 'Garrafa de vidro com design moderno e prático.', 
          price: 49.90, 
          image: 'img/GarrafaDeVidro.png', 
          type: 'accessory',
          sizes: ['Único'],
          colors: ['#4682B4'] // Azul aço
        },
          {
            id: 30,
            name: 'Mouse',
            description: 'Mouse ergonômico e com alta precisão.',
            price: 69.90,
            image: 'img/Mouse.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#000000', '#FFFFFF'] // Preto e branco
          },
          {
            id: 31,
            name: 'Fone de Ouvido Bluetooh Touch',
            description: 'Fone de ouvido Bluetooth com touch, design moderno e som de alta qualidade.',
            price: 106.00,
            image: 'img/FoneDeOuvidoBluetoohTouch.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#000000', '#FFD700'] // Preto e dourado
          },
          {
            id: 32,
            name: 'Mousepad Simples',
            description: 'Mousepad simples, ideal para uso diário e conforto no trabalho.',
            price: 24.90,
            image: 'img/MousepadSimples.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#808080'] // Cinza
          },
          {
            id: 33,
            name: 'Moleskine',
            description: 'Caderno Moleskine de alta qualidade, ideal para anotações e organização.',
            price: 49.90,
            image: 'img/Moleskine.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#000000', '#FFFFFF'] // Preto e branco
          },
          {
            id: 34,
            name: 'Caderno Pequeno',
            description: 'Caderno pequeno, prático e fácil de carregar, perfeito para o dia a dia.',
            price: 54.90,
            image: 'img/CadernoPequeno.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#8B4513'] // Marrom
          },
          {
            id: 35,
            name: 'Copo Térmico',
            description: 'Copo térmico com design moderno, ideal para bebidas quentes e frias.',
            price: 80.00,
            image: 'img/CopoTermico2.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#00BFFF', '#FFFFFF'] // Azul e branco
          },
          {
            id: 36,
            name: 'Copo Bucks',
            description: 'Copo prático e estiloso, ideal para o dia a dia.',
            price: 18.90,
            image: 'img/CopoBucks.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#FFD700', '#FFFFFF'] // Dourado e branco
          },
          {
            id: 37,
            name: 'Bloco de Anotações',
            description: 'Bloco de anotações compacto, perfeito para organização e ideias rápidas.',
            price: 13.00,
            image: 'img/BlocoDeAnotacao.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#FF6347'] // Vermelho tomate
          },
          {
            id: 38,
            name: 'Chaveiro',
            description: 'Chaveiro simples e funcional, ideal para manter suas chaves organizadas.',
            price: 6.50,
            image: 'img/Chaveiro.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#4682B4'] // Azul aço
          },
          {
            id: 39,
            name: 'Caneta Marca-Texto Colorida',
            description: 'Caneta marca-texto colorida, ideal para destacar pontos importantes.',
            price: 8.00,
            image: 'img/CanetaMarcaTexto.png',
            type: 'accessory',
            sizes: ['Único'],
            colors: ['#FFFF00', '#00FF00', '#FF6347'] // Amarelo, verde e vermelho
          },
            {
              id: 40,
              name: 'Cabo Multidispositivos',
              description: 'Cabo versátil para conexão de múltiplos dispositivos.',
              price: 35.50,
              image: 'img/Cabo.png',
              type: 'accessory',
              sizes: ['Único'],
              colors: ['#000000', '#FFFFFF'] // Preto e branco
            },
            {
              id: 41,
              name: 'Necessaire',
              description: 'Necessaire prática para armazenar seus itens de forma organizada.',
              price: 33.90,
              image: 'img/Necessaire.png',
              type: 'accessory',
              sizes: ['Único'],
              colors: ['#D3D3D3'] // Cinza claro
            },
            {
              id: 42,
              name: 'Caixa De Som Bluetooh',
              description: 'Caixa de som Bluetooth com som de alta qualidade para suas músicas.',
              price: 132.00,
              image: 'img/CaixaDeSom.png',
              type: 'accessory',
              sizes: ['Único'],
              colors: ['#0000FF', '#FFFFFF'] // Azul e branco
            }
          
          
  ];

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
