import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ApiResponseError } from "@/shared/types/api-response-error";
import { IniciarSesionRequestType } from "@/app/(auth)/iniciar-sesion/types/iniciar-sesion-request.type";
import { UsuarioAutenticacionType } from "@/shared/types/usuario-autenticacion-response.type";

export async function iniciarSesion(request: IniciarSesionRequestType): Promise<UsuarioAutenticacionType> {
    const responseHttp: Response = await fetch(`${config.apiBaseUrl}/auth/iniciar-sesion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        credentials: 'include'
    });

    switch (responseHttp.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<UsuarioAutenticacionType> = await responseHttp.json();

            return apiResponse.data as UsuarioAutenticacionType;
        }
        case HttpStatus.BAD_REQUEST: {
            const apiResponse: ApiResponseError = await responseHttp.json();

            const validationErrors = apiResponse.errors?.join("; ");

            throw new Error(validationErrors);
        }
        case HttpStatus.UNAUTHORIZED: {
            const apiResponse: ApiResponseError = await responseHttp.json();

            throw new Error(apiResponse.message);
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}