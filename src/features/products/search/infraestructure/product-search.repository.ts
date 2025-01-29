import { HttpStatus } from "@/shared/http-status";
import { ProductSummaryDto } from "../domain/dto/product-summary.dto";
import { IProductSearchRepository } from "../domain/repositories/product-search.repository.interface";
import config from "@/config";
import { injectable } from "inversify";

@injectable()
export class ProductSearchRepository implements IProductSearchRepository {

    async searchProducts(query: string): Promise<ProductSummaryDto[]> {
        const response: Response = await fetch(`${config.apiBaseUrl}/products/search?param=${query}`);

        switch (response.status) {
            case HttpStatus.OK:
                return await response.json();
            case HttpStatus.NO_CONTENT:
                return [];
            default:
                throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
        }
    }

}