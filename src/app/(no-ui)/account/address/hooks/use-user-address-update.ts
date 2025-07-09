import { useState, useCallback } from 'react';
import { UserAddressSaveType } from '../types/user-address-save.type';
import { userAddressUpdate } from '../services/user-address-update.service';
import { UserAddressSaveResponseType } from '../types/user-address-save-response.type';
import { useDispatch } from 'react-redux';
import { setUserAddressId } from '@/store/slices/checkout.slice';

export function useUserAddressUpdate() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (id: string, request: UserAddressSaveType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            const userAddressSaveResponse: UserAddressSaveResponseType = await userAddressUpdate(id, request);
            dispatch(setUserAddressId(userAddressSaveResponse.id));

            return true;
        } catch (e: any) {
            setError(e.message || 'Error desconocido');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return { execute, loading, error };
}
