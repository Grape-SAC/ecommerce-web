'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from "next/image";
import { CSSProperties } from "react";
import styles from "./home-banner.module.css";

// Tipos para tus banners (puedes ajustarlo a lo que venga de tu API)
type BannerType = {
    id: number;
    imagenUrl: string;
    titulo: string;
    link: string;
};

// Datos de ejemplo (luego los traes de tu API)
const bannersEjemplo: BannerType[] = [
    { id: 1, imagenUrl: 'banner_1.jpg', titulo: 'Oferta de Verano', link: '/categoria/verano' },
    { id: 2, imagenUrl: 'banner_2.jpg', titulo: 'Renueva tu Cocina', link: '/categoria/cocina' },
];

const HomeBanner = () => {
    return (
        <div className="w-full h-[200px] md:h-[400px] lg:h-[500px] relative">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true} // Flechitas a los lados
                className={`w-full h-full ${styles.swiperCustom}`}
            >
                {bannersEjemplo.map((banner, index) => (
                    <SwiperSlide key={banner.id} className="relative w-full h-full">
                        {/* Usamos 'fill' para que la imagen cubra absolutamente todo el div padre. */}
                        <img
                            src={`http://localhost:8080/images/banners/${banner.imagenUrl}`}
                            alt={banner.titulo}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading={index === 0 ? "eager" : "lazy"}
                        />

                        {/* Capa oscura opcional para que se lea el texto */}
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Texto o Botones encima de la imagen */}
                        {/* <div className="absolute bottom-10 left-5 text-white z-10">
                            <h2 className="text-2xl font-bold">{banner.titulo}</h2>
                            <button className="bg-primary text-white px-4 py-2 rounded mt-2">
                                Ver Más
                            </button>
                        </div> */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeBanner;