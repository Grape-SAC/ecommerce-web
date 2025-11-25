import { InformacionEntregaType } from "./informacion-entrega.type";
import { InformacionPagoType } from "./informacion-pago.type";
import { InformacionPedidoType } from "./informacion-pedido.type";
import { PedidoProductoType } from "./pedido-producto.type";
import { ResumenPagoType } from "./resumen-pago.type";

export interface DetallePedidoType {
   informacionPedido: InformacionPedidoType;
   informacionEntrega: InformacionEntregaType;
   informacionPago: InformacionPagoType;
   productos: PedidoProductoType[];
   resumenPago: ResumenPagoType;
}