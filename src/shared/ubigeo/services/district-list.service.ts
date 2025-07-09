import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { DistrictType } from "../types/district.type";

export async function listAllDistrictsByProvinceId(provinceId: string): Promise<DistrictType[]> {
    const response: Response = await fetch(`${config.apiBaseUrl}/ubigeos/districts?provinceId=${provinceId}`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<DistrictType[]> = await response.json();

            return apiResponse.data as DistrictType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}