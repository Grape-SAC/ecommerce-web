import { TipoDocumentoListaType } from '@/shared/document-types/types/tipo-documento-lista.type';
import { useState, useEffect } from 'react';
import { listarTiposDocumento } from '../services/document-type-list.service';

export function useTiposDocumento() {
    const [tiposDocumento, setTiposDocumento] = useState<TipoDocumentoListaType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listarTiposDocumento()
            .then(setTiposDocumento)
            .catch(() => setError('Error cargando tipos de documento'));
    }, []);

    return { tiposDocumento, error };
}