import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { SignUpRequestType } from "../types/sign-up-request.type";
import { ApiResponseError } from "@/shared/types/api-response-error";

export async function signUp(request: SignUpRequestType): Promise<String> {
    const response: Response = await fetch(`${config.apiBaseUrl}/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        credentials: 'include'
    });

    switch (response.status) {
        case HttpStatus.CREATED: {
            const apiResponse: ApiResponseOK<void> = await response.json();

            return apiResponse.message;
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