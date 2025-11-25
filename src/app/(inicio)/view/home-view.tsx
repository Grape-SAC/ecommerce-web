'use client';

import HomeBanner from "../components/home-banner";

const HomeView = () => {
    return (
        <div className="flex flex-col gap-6">

            {/* 1. Aquí va tu Banner Principal */}
            <section className="w-full">
                <HomeBanner />
            </section>

            {/* 2. Aquí irán tus otras secciones a futuro */}
            <section className="container mx-auto px-4">
                {/* <h2 className="text-2xl font-bold mb-4">Productos Destacados</h2> */}
                {/* <CarruselProductoView ... /> */}
            </section>

        </div>
    );
};

export default HomeView;