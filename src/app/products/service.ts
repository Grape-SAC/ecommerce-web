import config from "@/config";
import { ProductDetailDto } from "./product-detail.dto";
import { HttpStatus } from "@/utils/http-status";

export const getProductDetail = async (slug: string): Promise<ProductDetailDto | null> => {
    const response = await fetch(`${config.apiBaseUrl}/products/slug/${slug}`);

    switch (response.status) {
        case HttpStatus.OK:
            return await response.json();
        case HttpStatus.NOT_FOUND:
            return null;
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
};