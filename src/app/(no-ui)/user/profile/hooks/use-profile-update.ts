import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/auth.slice';
import { AuthUserResponseType } from '@/app/(no-ui)/auth/register/types/auth-user-response.type';
import { UserProfileUpdateType } from '@/app/(no-ui)/user/profile/types/user-profile-update.type';
import { userProfileUpdate } from '@/app/(no-ui)/user/profile/services/user-profile-update.service';

export function useUserProfileUpdate() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (request: UserProfileUpdateType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {console.log("hola")
            const authUser: AuthUserResponseType = await userProfileUpdate(request);

            dispatch(setUser(authUser));

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
