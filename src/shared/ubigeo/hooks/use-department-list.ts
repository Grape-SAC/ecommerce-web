import { useState, useEffect } from 'react';
import { listAllDepartments } from '../services/department-list.service';
import { DepartmentType } from '../types/department.type';

export function useDepartmentList() {
    const [departments, setDepartments] = useState<DepartmentType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listAllDepartments()
            .then(setDepartments)
            .catch(() => setError('Error cargando departamentos'));
    }, []);

    return { departments, error };
}