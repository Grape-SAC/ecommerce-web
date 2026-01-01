'use client';

import { useEffect, useState } from 'react';
import { ResumenProductoType } from '@/shared/types/resumen-producto.type';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { obtenerProductosPorIds } from '../services/obtener-productos-por-ids.service';

export function useFavoritos() {
    const productosIds = useSelector(
        (state: RootState) => state.favoritos.productosIds
    );

    const [productos, setProductos] = useState<ResumenProductoType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (productosIds.length === 0) {
            setProductos([]);
            setLoading(false);
            setError(null);
            return;
        }

        const cargarFavoritos = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await obtenerProductosPorIds(productosIds);
                setProductos(data);
            } catch (e) {
                setError('Error cargando favoritos');
                setProductos([]);
            } finally {
                setLoading(false);
            }
        };

        cargarFavoritos();
    }, [productosIds]);

    return {
        productos,
        total: productosIds.length,
        loading,
        error,
        isEmpty: productosIds.length === 0,
    };
}
