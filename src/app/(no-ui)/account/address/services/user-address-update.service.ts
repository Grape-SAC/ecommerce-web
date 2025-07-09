import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { UserAddressSaveType } from "../types/user-address-save.type";
import { UserAddressSaveResponseType } from "../types/user-address-save-response.type";

export async function userAddressUpdate(id:string, request: UserAddressSaveType): Promise<UserAddressSaveResponseType> {
    const response: Response = await fetch(`${config.apiBaseUrl}/user-addresses/me/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        credentials: 'include'
    });

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<UserAddressSaveResponseType> = await response.json();

            return apiResponse.data as UserAddressSaveResponseType;
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}