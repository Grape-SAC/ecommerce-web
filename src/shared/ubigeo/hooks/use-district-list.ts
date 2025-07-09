import { useState, useEffect } from 'react';
import { listAllDistrictsByProvinceId } from '../services/district-list.service';
import { DistrictType } from '../types/district.type';

export function useDistrictList(provinceId: string) {
    const [districts, setDistricts] = useState<DistrictType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listAllDistrictsByProvinceId(provinceId)
            .then(setDistricts)
            .catch(() => setError('Error cargando distritos'));
    }, [provinceId]);

    return { districts, error };
}