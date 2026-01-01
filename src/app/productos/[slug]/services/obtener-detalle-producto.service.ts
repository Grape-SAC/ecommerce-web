import config from "@/config/config";
import { HttpStatus } from "@/shared/enum/http-status";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { DetalleProductoType } from "../types/detalle-producto.type";

export async function obtenerDetalleProducto(slug: string): Promise<DetalleProductoType | null> {
    const response = await fetch(`${config.apiBaseUrlServer}/productos/slug/${slug}`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<DetalleProductoType> = await response.json();

            return apiResponse.data as DetalleProductoType;
        }
        case HttpStatus.NOT_FOUND:
            return null;
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}