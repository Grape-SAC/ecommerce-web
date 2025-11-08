import { useState, useEffect } from 'react';
import { listarProvinciasPorDepartamento } from '../services/lista-provincias.service';
import { ListaProvinciaType } from '../types/lista-provincia.type';

export function useListaProvincias(departamentoId: string) {
    const [provincias, setProvincias] = useState<ListaProvinciaType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listarProvinciasPorDepartamento(departamentoId)
            .then(setProvincias)
            .catch(() => setError('Error cargando provincias'));
    }, [departamentoId]);

    return { provincias, error };
}