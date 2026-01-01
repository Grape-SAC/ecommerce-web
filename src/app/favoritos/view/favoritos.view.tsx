'use client';

import { LoadingPage } from "@/components/ui/loading-page/loading-page";
import { useFavoritos } from "../hooks/use-favoritos-productos";
import EstadoVacioFavoritos from "./estado-vacio-favoritos";
import ListarProductosView from "@/app/buscar/[query]/view/listar-productos.view";
import styles from './favoritos.module.css';

export default function FavoritosView() {
    const { productos, loading, error, isEmpty } = useFavoritos();

    if (error) {
        return <p>{error}</p>;
    }

    if (isEmpty) {
        return <EstadoVacioFavoritos />;
    }

    return (
        <div className={styles.container}>
            {loading && <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />}

            <ListarProductosView productos={productos} />
        </div>
    );
}
