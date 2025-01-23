import config from "@/config";
import { ProductSummaryDto } from "./product-summary.dto";
import { HttpStatus } from "@/utils/http-status";


export const searchProducts = async (query: string): Promise<ProductSummaryDto[]> => {
    const response: Response = await fetch(`${config.apiBaseUrl}/products/search?param=${query}`);

    switch(response.status) {
        case HttpStatus.OK:
            return await response.json();
        case HttpStatus.NO_CONTENT:
            return [];
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
};
