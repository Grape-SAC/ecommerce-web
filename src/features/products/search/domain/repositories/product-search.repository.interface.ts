import { ProductSummaryDto } from "../dto/product-summary.dto";

export interface IProductSearchRepository {
    searchProducts(query: string): Promise<ProductSummaryDto[]>;
}