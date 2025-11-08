import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ListaProvinciaType } from "../types/lista-provincia.type";

export async function listarProvinciasPorDepartamento(departamentoId: string): Promise<ListaProvinciaType[]> {
    const response: Response = await fetch(`${config.apiBaseUrl}/ubigeos/provincias?departamentoId=${departamentoId}`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<ListaProvinciaType[]> = await response.json();

            return apiResponse.data as ListaProvinciaType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}