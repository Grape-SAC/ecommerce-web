import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/autenticacion.slice';
import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';
import { ActualizarPerfilType } from '../types/actualizar-datos-personales.type';
import { actualizarDatosPersonales } from '../services/actualizar-datos-personales.service';

export function useActualizarDatosPersonales() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (request: ActualizarPerfilType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            const usuarioResponse: UsuarioAutenticacionType = await actualizarDatosPersonales(request);

            dispatch(setUser(usuarioResponse));

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
