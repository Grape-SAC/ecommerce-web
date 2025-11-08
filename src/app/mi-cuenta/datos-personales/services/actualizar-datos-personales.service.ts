import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ApiResponseError } from "@/shared/types/api-response-error";
import { UsuarioAutenticacionType } from "@/shared/types/usuario-autenticacion-response.type";
import { ActualizarPerfilType } from "../types/actualizar-datos-personales.type";

export async function actualizarDatosPersonales(request: ActualizarPerfilType): Promise<UsuarioAutenticacionType> {
    const response: Response = await fetch(`${config.apiBaseUrl}/auth/actualizar-perfil`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        credentials: 'include'
    });

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<UsuarioAutenticacionType> = await response.json();

            return apiResponse.data as UsuarioAutenticacionType;
        }
        case HttpStatus.BAD_REQUEST: {
            const apiResponse: ApiResponseError = await response.json();

            const validationErrors = apiResponse.errors?.join("; ");

            throw new Error(validationErrors);
        }
        case HttpStatus.CONFLICT: {
            const apiResponse: ApiResponseError = await response.json();

            throw new Error(apiResponse.message);
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}