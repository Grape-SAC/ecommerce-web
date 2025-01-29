import { ProductSummaryDto } from "../dto/product-summary.dto";

export interface IProductSearchService {
    execute(query: string): Promise<ProductSummaryDto[]>;
}