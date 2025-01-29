import { inject, injectable } from "inversify";
import { ProductSummaryDto } from "../domain/dto/product-summary.dto";
import type { IProductSearchRepository } from "../domain/repositories/product-search.repository.interface";
import { TYPES } from "@/types";
import { IProductSearchService } from "../domain/services/product-search.service.interface";

@injectable()
export class ProductSearchService implements IProductSearchService {
    constructor(
        @inject(TYPES.IProductSearchRepository) 
        private readonly repository: IProductSearchRepository
    ) {}

    async execute(query: string): Promise<ProductSummaryDto[]> {
        return this.repository.searchProducts(query);
    }
}
