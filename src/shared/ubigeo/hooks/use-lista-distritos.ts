import { useState, useEffect } from 'react';
import { listarDistritosPorProvincia } from '../services/lista-distritos.service';
import { ListaDistritoType } from '../types/lista-distrito.type';

export function useListaDistritos(provinciaId: string) {
    const [distritos, setDistritos] = useState<ListaDistritoType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listarDistritosPorProvincia(provinciaId)
            .then(setDistritos)
            .catch(() => setError('Error cargando distritos'));
    }, [provinciaId]);

    return { distritos, error };
}