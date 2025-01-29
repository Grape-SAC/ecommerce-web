import { injectable } from "inversify";
import { IProductDetailRepository } from "../domain/repositories/product-detail.repository.interface";
import { ProductDetailDto } from "../domain/dto/product-detail.dto";
import config from "@/config";
import { HttpStatus } from "@/shared/http-status";

@injectable()
export class ProductDetailRepository implements IProductDetailRepository {

    async getProductDetail(slug: string): Promise<ProductDetailDto | null> {
        const response = await fetch(`${config.apiBaseUrl}/products/slug/${slug}`);

        switch (response.status) {
            case HttpStatus.OK:
                return await response.json();
            case HttpStatus.NO_CONTENT:
                return null;
            default:
                throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
        }
    }

}