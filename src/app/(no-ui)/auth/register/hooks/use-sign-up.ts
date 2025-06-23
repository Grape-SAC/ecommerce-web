import { useState, useCallback } from 'react';
import { SignUpRequestType } from '../types/sign-up-request.type';
import { signUp } from '../services/sign-up.service';
import { AuthUserResponseType } from '../types/auth-user-response.type';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/auth.slice';
import { signIn } from '@/app/(no-ui)/auth/login/services/sign-in.service';
import { SignInRequestType } from '@/app/(no-ui)/auth/login/types/sign-in.type';

export function useSignUp() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (requestSignUp: SignUpRequestType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            await signUp(requestSignUp);

            const requestSignIn: SignInRequestType = {
                username: requestSignUp.email,
                password: requestSignUp.password
            }

            const authUser: AuthUserResponseType = await signIn(requestSignIn);

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
