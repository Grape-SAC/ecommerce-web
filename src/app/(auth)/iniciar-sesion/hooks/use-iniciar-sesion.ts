import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/autenticacion.slice';
import { iniciarSesion } from '@/app/(auth)/iniciar-sesion/services/iniciar-sesion.service';
import { IniciarSesionRequestType } from '@/app/(auth)/iniciar-sesion/types/iniciar-sesion-request.type';
import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';
import { ApiResponseError } from '@/shared/types/api-response-error';

export function useIniciarSesion() {
    const [error, setError] = useState<ApiResponseError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (iniciarSesionRequest: IniciarSesionRequestType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            const usuarioResponse: UsuarioAutenticacionType = await iniciarSesion(iniciarSesionRequest);

            dispatch(setUser(usuarioResponse));

            return true;
        } catch (e: ApiResponseError | any) {
            setError(e || 'Error desconocido');
            setLoading(false);
            return false;
        }
    }, [dispatch]);

    return { execute, loading, error };
}
