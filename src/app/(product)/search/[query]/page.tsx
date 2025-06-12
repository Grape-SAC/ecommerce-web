import ProductListView from './components/product-list';
import { searchProducts } from './services/product-search-service';
import { ProductSummaryType } from './types/product-summary';

const SearchPage = async ({ params }: { params: { query: string } }) => {    
    const products: ProductSummaryType[] = await searchProducts(params.query);

    if (products.length === 0) {
        return <p>No se encontraron productos.</p>;
    }

    return (
        <ProductListView products={products} />
    );
};

export default SearchPage;
