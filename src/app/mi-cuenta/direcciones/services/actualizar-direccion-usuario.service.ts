import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { GuardarDireccionUsuarioType } from "../types/guardar-direccion-usuario.type";
import { GuardarDireccionUsuarioResponseType } from "../types/guardar-direccion-usuario-response.type";

export async function actualizarDireccionUsuario(id:string, request: GuardarDireccionUsuarioType): Promise<GuardarDireccionUsuarioResponseType> {
    const response: Response = await fetch(`${config.apiBaseUrl}/usuario-direcciones/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        credentials: 'include'
    });

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<GuardarDireccionUsuarioResponseType> = await response.json();

            return apiResponse.data as GuardarDireccionUsuarioResponseType;
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}