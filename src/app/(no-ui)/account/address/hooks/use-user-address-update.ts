import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UserAddressSaveType } from '../types/user-address-save.type';
import { userAddressUpdate } from '../services/user-address-update.service';

export function useUserAddressUpdate() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (id: string, request: UserAddressSaveType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            await userAddressUpdate(id, request);

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
