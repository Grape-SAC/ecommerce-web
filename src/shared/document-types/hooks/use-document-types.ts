import { DocumentTypeListType } from '@/shared/document-types/types/document-type-list.type';
import { useState, useEffect } from 'react';
import { findAllDocumentTypes } from '../services/document-type-list.service';

export function useDocumentTypes() {
    const [documentTypes, setDocumentTypes] = useState<DocumentTypeListType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        findAllDocumentTypes()
            .then(setDocumentTypes)
            .catch(() => setError('Error cargando tipos de documento'));
    }, []);

    return { documentTypes, error };
}