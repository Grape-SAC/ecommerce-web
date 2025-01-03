import config from "@/config";
import { ApiResponse } from "@/types/api-response";
import { ProductSummaryDto } from "./product-summary-dto";


export const searchProducts = async (query: string) => {
    try {
        const response = await fetch(`${config.apiBaseUrl}/products/search?param=${query}`);

        const apiResponse: ApiResponse<ProductSummaryDto[]> = await response.json();

        if (!response.ok) {
            throw new Error(`${apiResponse.code} - ${apiResponse.message}`);
        }
        
        return apiResponse.data || [];
    } catch (error: unknown) {
        console.error(error);
        throw new Error('No se pudo obtener los resultados de búsqueda.');
    }
};
