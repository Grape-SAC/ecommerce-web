import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ListaDistritoType } from "../types/lista-distrito.type";

export async function listarDistritosPorProvincia(provinciaId: string): Promise<ListaDistritoType[]> {
    const response: Response = await fetch(`${config.apiBaseUrlPublic}/ubigeos/distritos?provinciaId=${provinciaId}`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<ListaDistritoType[]> = await response.json();

            return apiResponse.data as ListaDistritoType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}