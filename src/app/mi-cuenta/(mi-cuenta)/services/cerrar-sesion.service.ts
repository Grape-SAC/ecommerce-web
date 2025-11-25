import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ApiResponseError } from "@/shared/types/api-response-error";

export async function cerrarSesion(): Promise<string> {
    const response: Response = await fetch(`${config.apiBaseUrlPublic}/auth/cerrar-sesion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ¡IMPORTANTE! Esto envía las cookies httpOnly (access_token, refresh_token)
        // al backend para que pueda borrarlas.
        credentials: 'include' 
    });

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<void> = await response.json();
            return apiResponse.message;
        }
        // Agrega manejo de errores si lo deseas
        case HttpStatus.INTERNAL_SERVER_ERROR: {
             const apiResponse: ApiResponseError = await response.json();
             throw new Error(apiResponse.message);
        }
        default:
            throw new Error('Algo salió mal al cerrar la sesión.');
    }
}