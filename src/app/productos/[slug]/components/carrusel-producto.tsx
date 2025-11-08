'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { useState, useRef } from 'react';
import styles from './carrusel-producto.module.css';
import { ProductoImagenType } from "../types/producto-imagen.type";

const CarruselProductoView = ({ imagenes }: { imagenes: ProductoImagenType[] }) => {
    const [indiceImagenActual, setIndiceImagenActual] = useState(0);
    const swiperRef = useRef<any>(null); // Referencia para la instancia de Swiper

    const manejarClickMiniatura = (indice: number) => {
        setIndiceImagenActual(indice);

        // Acceder a la instancia de Swiper y cambiar al slide correspondiente
        if (swiperRef.current) {
            swiperRef.current.swiper.slideTo(indice);
        }
    };

    return (
        <div>
            {/* Carrusel de imágenes grandes */}
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                onSlideChange={(swiper) => setIndiceImagenActual(swiper.activeIndex)} // Cambiar la imagen al deslizar
                initialSlide={indiceImagenActual} // Iniciar en la imagen actual
                ref={swiperRef} // Referencia a la instancia de Swiper
                className={styles.carouselParent}
            >
                {imagenes.map((imagen, indice) => (
                    <SwiperSlide key={indice}>
                        <img
                            src={`http://localhost:8080/imagenes/${imagen.nombre}`}
                            alt={`Imagen ${indice + 1}`}
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
                {imagenes.map((imagen, indice) => (
                    <SwiperSlide key={indice}>
                        <img
                            src={`http://localhost:8080/imagenes/${imagen.nombre}`}
                            alt={`Miniatura ${indice + 1}`}
                            className="w-full h-auto object-cover cursor-pointer"
                            onClick={() => manejarClickMiniatura(indice)} // Actualizar imagen principal
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Renderizar miniaturas como fallback */}
            <noscript>
                <ul>
                    {imagenes.map((imagen, indice) => (
                        <li key={indice}>
                            <img
                                src={`http://localhost:8080/imagenes/${imagen.nombre}`}
                                alt={`Imagen ${indice + 1}`}
                            />
                        </li>
                    ))}
                </ul>
            </noscript>
        </div>
    );
}

export default CarruselProductoView;
