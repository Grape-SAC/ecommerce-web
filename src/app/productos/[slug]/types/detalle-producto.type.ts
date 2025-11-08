import { ProductoImagenType } from "./producto-imagen.type";

export interface DetalleProductoType {
    id: string;
    nombre: string;
    descripcion: string;
    stock: number;
    precioVenta: number;
    imagenes: ProductoImagenType[];
}