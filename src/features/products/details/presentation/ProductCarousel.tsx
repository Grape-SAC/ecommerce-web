'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { ProductImageDto } from "../domain/dto/product-image.dto";
import 'swiper/css';
import { useState, useRef } from 'react';
import styles from './ProductCarousel.module.css';

const ProductCarousel = ({ images }: { images: ProductImageDto[] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const swiperRef = useRef<any>(null); // Referencia para la instancia de Swiper

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);

        // Acceder a la instancia de Swiper y cambiar al slide correspondiente
        if (swiperRef.current) {
            swiperRef.current.swiper.slideTo(index);
        }
    };

    return (
        <div>
            {/* Carrusel de imágenes grandes */}
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)} // Cambiar la imagen al deslizar
                initialSlide={currentImageIndex} // Iniciar en la imagen actual
                ref={swiperRef} // Referencia a la instancia de Swiper
                className={styles.carouselParent}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={`http://localhost:8080/images/${image.name}`}
                            alt={`Imagen ${index + 1}`}
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Carrusel de miniaturas */}
            <Swiper
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}  // Permite el desplazamiento libre sin un slide fijo
                watchSlidesProgress={true}  // Detecta cuando una miniatura se desplaza fuera de vista
                className="swiper-thumbnails"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={`http://localhost:8080/images/${image.name}`}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-auto object-cover cursor-pointer"
                            onClick={() => handleThumbnailClick(index)} // Actualizar imagen principal
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Renderizar miniaturas como fallback */}
            <noscript>
                <ul>
                    {images.map((image, index) => (
                        <li key={index}>
                            <img
                                src={`http://localhost:8080/images/${image.name}`}
                                alt={`Imagen ${index + 1}`}
                            />
                        </li>
                    ))}
                </ul>
            </noscript>
        </div>
    );
}

export default ProductCarousel;
