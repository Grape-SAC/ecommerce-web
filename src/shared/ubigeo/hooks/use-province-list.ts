import { useState, useEffect } from 'react';
import { listAllProvincesByDepartmentId } from '../services/province-list.service';
import { ProvinceType } from '../types/province.type';

export function useProvinceList(departmentId: string) {
    const [provinces, setProvinces] = useState<ProvinceType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listAllProvincesByDepartmentId(departmentId)
            .then(setProvinces)
            .catch(() => setError('Error cargando provincias'));
    }, [departmentId]);

    return { provinces, error };
}