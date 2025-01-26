
import { ProductSummaryDto } from '@/features/products/search/domain/product-summary.dto';
import { searchProducts } from '@/features/products/search/application/product-search.service';
import ProductList from '@/features/products/search/presentation/ProductList';

const SearchPage = async ({ params }: { params: { query: string } }) => {
    const query = params?.query || '';
    
    let products: ProductSummaryDto[] = await searchProducts(query);
    console.log("hola", products)
    return (
        <div>
            {products.length > 0 ? <ProductList products={products} /> : <p>No se encontraron productos.</p>}
        </div>
    );
};

export default SearchPage;
