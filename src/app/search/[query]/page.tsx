
import { ProductSummaryDto } from '../product-summary-dto';
import { searchProducts } from '../service';
import ProductList from './ProductList';

const SearchPage = async ({ params }: { params: { query: string } }) => {
    const query = params?.query || '';
    let products: ProductSummaryDto[] = await searchProducts(query);

    return (
        <div>
            {products.length > 0 ? <ProductList products={products} /> : <p>No se encontraron productos.</p>}
        </div>
    );
};

export default SearchPage;
