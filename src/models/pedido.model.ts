import { EstadoPedido } from "src/enum/estado_pedido.enum";
import { ItemPedido } from "./item_pedido.model";

export class Pedido {
    id: number;
    idusuario: number;
    fechaPedido: Date;
    estado: EstadoPedido;
    total: number; // Precio total
    items: ItemPedido[];
}
