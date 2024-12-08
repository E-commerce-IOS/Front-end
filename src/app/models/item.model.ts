import { Cor } from "./cor.model";
import { Produto } from "./produto.model";
import { Tamanho } from "./tamanho.model";


export interface Item {
// ? para identificar que não é obrigátorio
  idItem?: number,
  cor: Cor,
  produto: Produto,
  tamanho?: Tamanho,
  preco: number,
  quantidade: number,
  modelo: string | null,
  codigo: string | null,
  imagemProduto: string | null 
}