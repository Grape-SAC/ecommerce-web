import { ProductDetailDto } from '../domain/dto/product-detail.dto';
import ProductCarousel from './ProductCarousel';
import styles from './ProductDetails.module.css';
import AddToCartButton from '@/components/ui/AddToCartButton/AddToCartButton';

const ProductDetails = ({ product }: { product: ProductDetailDto }) => {
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
            <ProductCarousel images={product.images} />
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.productPrice}>
                <data value={`${product.salePrice}`}>S/.{product.salePrice}</data>
            </p>
            <AddToCartButton product={product} />
            <p className={styles.descriptionText}>{formatDescription(product.description)}</p>
        </section>
    );
};

export default ProductDetails;
