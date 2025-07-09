import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ProvinceType } from "../types/province.type";

export async function listAllProvincesByDepartmentId(departmentId: string): Promise<ProvinceType[]> {
    const response: Response = await fetch(`${config.apiBaseUrl}/ubigeos/provinces?departmentId=${departmentId}`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<ProvinceType[]> = await response.json();

            return apiResponse.data as ProvinceType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}