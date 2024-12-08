import { Item } from "./item.model";
import { Usuario } from "./usuario.model";

export interface Carrinho {
    id_carrinho?: number,
    usuario: Usuario,
    item: Item
}