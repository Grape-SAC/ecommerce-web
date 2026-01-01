import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ResumenProductoType } from "@/shared/types/resumen-producto.type";

export async function obtenerProductosPorIds(ids: string[]): Promise<ResumenProductoType[]> {
    const response: Response = await fetch(`${config.apiBaseUrlPublic}/productos?ids=${ids.join(',')}`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<ResumenProductoType[]> = await response.json();

            return apiResponse.data as ResumenProductoType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}