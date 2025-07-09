import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ApiResponseError } from "@/shared/types/api-response-error";
import { AuthUserResponseType } from "@/app/(no-ui)/auth/register/types/auth-user-response.type";
import { SignInRequestType } from "@/app/(no-ui)/auth/login/types/sign-in.type";

export async function signIn(request: SignInRequestType): Promise<AuthUserResponseType> {
    const response: Response = await fetch(`${config.apiBaseUrl}/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        credentials: 'include'
    });

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<AuthUserResponseType> = await response.json();

            return apiResponse.data as AuthUserResponseType;
        }
        case HttpStatus.BAD_REQUEST: {
            const apiResponse: ApiResponseError = await response.json();

            const validationErrors = apiResponse.errors?.join("; ");

            throw new Error(validationErrors);
        }
        case HttpStatus.UNAUTHORIZED: {
            const apiResponse: ApiResponseError = await response.json();

            throw new Error(apiResponse.message);
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}