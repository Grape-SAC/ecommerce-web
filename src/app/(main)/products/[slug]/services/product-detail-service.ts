import config from "@/config/config";
import { HttpStatus } from "@/shared/enum/http-status";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { ProductDetailType } from "../types/product-detail.type";

export async function getProductDetail(slug: string): Promise<ProductDetailType | null> {
    const response = await fetch(`${config.apiBaseUrl}/products/slug/${slug}`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<ProductDetailType> = await response.json();

            return apiResponse.data as ProductDetailType;
        }
        case HttpStatus.NOT_FOUND:
            return null;
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}