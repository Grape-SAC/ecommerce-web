import { UsuarioAutenticacionType } from "@/app/(auth)/register/types/usuario-autenticacion.type";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";

export async function refreshToken(): Promise<UsuarioAutenticacionType | null> {
    const res = await fetch(`${config.apiBaseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
    });

    if (res.ok) {
        const apiResponse: ApiResponseOK<UsuarioAutenticacionType> = await res.json();

        return apiResponse.data as UsuarioAutenticacionType; 
    }

    return null;
}