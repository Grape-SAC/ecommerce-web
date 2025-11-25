import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ListaDepartamentoType } from "../types/lista-departamento.type";

export async function listarDepartamentos(): Promise<ListaDepartamentoType[]> {
    const response: Response = await fetch(`${config.apiBaseUrlPublic}/ubigeos/departamentos`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<ListaDepartamentoType[]> = await response.json();

            return apiResponse.data as ListaDepartamentoType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}