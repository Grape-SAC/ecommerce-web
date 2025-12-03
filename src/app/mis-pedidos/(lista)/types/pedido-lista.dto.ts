export interface PedidoListaDto {
    id: string;
    codigo: string;
    estadoDescripcion: string;
    estadoCodigo: string;
    cantidadProductos: number;
    fechaCompra: string;
    montoTotal: number;
}