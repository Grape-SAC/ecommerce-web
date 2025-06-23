import ProductCarouselView from '../components/product-carousel';
import { ProductDetailType } from '../types/product-detail.type';
import styles from './product-detail.module.css';
import AddToCartButton from '@/components/ui/add-to-cart-button/add-to-cart-button';

const ProductDetailView = ({ product }: { product: ProductDetailType }) => {
    const formatDescription = (text: string) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <section>
            <ProductCarouselView images={product.images} />
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.productPrice}>
                <data value={`${product.salePrice}`}>S/.{product.salePrice}</data>
            </p>
            <AddToCartButton product={product} />
            <p className={styles.descriptionText}>{formatDescription(product.description)}</p>
        </section>
    );
};

export default ProductDetailView;
