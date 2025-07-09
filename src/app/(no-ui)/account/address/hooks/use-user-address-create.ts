import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UserAddressSaveType } from '../types/user-address-save.type';
import { userAddressCreate } from '../services/user-address-create.service';

export function useUserAddressCreate() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (request: UserAddressSaveType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            await userAddressCreate(request);

            return true;
        } catch (e: any) {
            setError(e.message || 'Error desconocido');
            return false;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    return { execute, loading, error };
}
