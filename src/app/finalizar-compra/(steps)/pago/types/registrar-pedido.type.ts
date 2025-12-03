import { ArticuloPedidoType } from "./articulo-pedido.type";

export interface RegistrarPedidoType {
    productos: ArticuloPedidoType[];
    codigoMetodoPago: string;  
    codigoTipoEntrega: string;  
    usuarioDireccionId: string;
    costoEnvio: number;
}