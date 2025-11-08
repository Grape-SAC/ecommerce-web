import { useState, useCallback } from 'react';
import { GuardarDireccionUsuarioType } from '../types/guardar-direccion-usuario.type';
import { actualizarDireccionUsuario } from '../services/actualizar-direccion-usuario.service';
import { GuardarDireccionUsuarioResponseType } from '../types/guardar-direccion-usuario-response.type';
import { useDispatch } from 'react-redux';
import { setUsuarioDireccionId } from '@/store/slices/finaliza-compra.slice';

export function useActualizarDireccionUsuario() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (id: string, request: GuardarDireccionUsuarioType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            const response: GuardarDireccionUsuarioResponseType = await actualizarDireccionUsuario(id, request);

            dispatch(setUsuarioDireccionId(response.id));

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
