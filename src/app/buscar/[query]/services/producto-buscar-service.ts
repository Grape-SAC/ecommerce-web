import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ResumenProductoType } from "../types/resumen-producto.type";

export async function buscarProducto(param: string): Promise<ResumenProductoType[]> {
    const response: Response = await fetch(`${config.apiBaseUrlServer}/productos/buscar?param=${param}`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<ResumenProductoType[]> = await response.json();

            return apiResponse.data as ResumenProductoType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}