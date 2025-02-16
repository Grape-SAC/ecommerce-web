
import { ProductSummaryDto } from '@/features/products/search/domain/dto/product-summary.dto';
import ProductList from '@/features/products/search/presentation/ProductList';
import container from '@/container';
import { TYPES } from '@/types';
import { IProductSearchService } from '@/features/products/search/domain/services/product-search.service.interface';

const SearchPage = async ({ params }: { params: { query: string } }) => {
    const service = container.get<IProductSearchService>(TYPES.IProductSearchService);
    
    let products: ProductSummaryDto[] = await service.execute(params.query);

    return (
        <div>
            {products.length > 0 ? <ProductList products={products} /> : <p>No se encontraron productos.</p>}
        </div>
    );
};

export default SearchPage;
