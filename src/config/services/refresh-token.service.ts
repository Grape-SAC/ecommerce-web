import { AuthUserResponseType } from "@/app/(no-ui)/auth/register/types/auth-user-response.type";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";

export async function refreshToken(): Promise<AuthUserResponseType | null> {
    const res = await fetch(`${config.apiBaseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
    });

    if (res.ok) {
        const apiResponse: ApiResponseOK<AuthUserResponseType> = await res.json();

        return apiResponse.data as AuthUserResponseType; 
    }

    return null;
}