import { Produto } from "./produto.model";


export interface Item {
// ? para identificar que não é obrigátorio
  idItem?: number,
  idCor?: number,
  produto: Produto,
  idTamanho: number,
  preco: number,
  quantidade: number,
  modelo: string | null,
  codigo: string | null,
  imagemProduto: string | null 
}