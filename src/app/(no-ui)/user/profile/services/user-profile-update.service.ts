import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ApiResponseError } from "@/shared/types/api-response-error";
import { AuthUserResponseType } from "@/app/(no-ui)/auth/register/types/auth-user-response.type";
import { UserProfileUpdateType } from "@/app/(no-ui)/user/profile/types/user-profile-update.type";

export async function userProfileUpdate(request: UserProfileUpdateType): Promise<AuthUserResponseType> {
    const response: Response = await fetch(`${config.apiBaseUrl}/users/me`, {
        method: 'PUT',
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
        case HttpStatus.CONFLICT: {
            const apiResponse: ApiResponseError = await response.json();

            throw new Error(apiResponse.message);
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}