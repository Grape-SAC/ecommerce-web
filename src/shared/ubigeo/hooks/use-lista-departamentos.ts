import { useState, useEffect } from 'react';
import { listarDepartamentos } from '../services/lista-departamentos.service';
import { ListaDepartamentoType } from '../types/lista-departamento.type';

export function useListaDepartamentos() {
    const [departamentos, setDepartamentos] = useState<ListaDepartamentoType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listarDepartamentos()
            .then(setDepartamentos)
            .catch(() => setError('Error cargando departamentos'));
    }, []);

    return { departamentos, error };
}