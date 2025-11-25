
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { UsuarioAutenticacionType } from "@/shared/types/usuario-autenticacion-response.type";

export async function refreshToken(): Promise<UsuarioAutenticacionType | null> {
    const res = await fetch(`${config.apiBaseUrlPublic}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
    });

    if (res.ok) {
        const apiResponse: ApiResponseOK<UsuarioAutenticacionType> = await res.json();

        return apiResponse.data as UsuarioAutenticacionType; 
    }

    return null;
}