import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { UserAddressListType } from "../types/user-address-list.type";
import { cookies } from "next/headers";

export async function listAllUserAddresses(): Promise<UserAddressListType[]> {
    const cookieHeader = cookies().toString();

    const response: Response = await fetch(`${config.apiBaseUrl}/user-addresses/me`, {
        method: 'GET',
        headers: {
            Cookie: cookieHeader,
        }
    });

    console.log("STATUS", response.status);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<UserAddressListType[]> = await response.json();

            return apiResponse.data as UserAddressListType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}