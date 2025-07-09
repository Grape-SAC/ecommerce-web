import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { DepartmentType } from "../types/department.type";

export async function listAllDepartments(): Promise<DepartmentType[]> {
    const response: Response = await fetch(`${config.apiBaseUrl}/ubigeos/departments`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<DepartmentType[]> = await response.json();

            return apiResponse.data as DepartmentType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}