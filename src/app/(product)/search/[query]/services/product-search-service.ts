import { HttpStatus } from "@/shared/enum/http-status";
import { ProductSummaryType } from "../types/product-summary";
import config from "@/config";
import { ApiResponse } from "@/shared/types/api-response";

export async function searchProducts(param: string): Promise<ProductSummaryType[]> {
    const response: Response = await fetch(`${config.apiBaseUrl}/products/search?param=${param}`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponse<ProductSummaryType[]> = await response.json();

            return apiResponse.data as ProductSummaryType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}