import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ListaDireccionesUsuarioType } from "../types/lista-direcciones-usuario.type";
import { cookies } from "next/headers";

export async function listarDireccionesUsuario(): Promise<ListaDireccionesUsuarioType[]> {
    const cookieHeader = cookies().toString();

    const response: Response = await fetch(`${config.apiBaseUrlServer}/usuario-direcciones`, {
        method: 'GET',
        headers: {
            Cookie: cookieHeader,
        }
    });

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<ListaDireccionesUsuarioType[]> = await response.json();

            return apiResponse.data as ListaDireccionesUsuarioType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}