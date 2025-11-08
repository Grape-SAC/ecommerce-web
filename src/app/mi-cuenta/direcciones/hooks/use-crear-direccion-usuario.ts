import { useState, useCallback } from 'react';
import { GuardarDireccionUsuarioType } from '../types/guardar-direccion-usuario.type';
import { crearDireccionUsuario } from '../services/crear-direccion-usuario.service';
import { GuardarDireccionUsuarioResponseType } from '../types/guardar-direccion-usuario-response.type';
import { useDispatch } from 'react-redux';
import { setUsuarioDireccionId } from '@/store/slices/finaliza-compra.slice';

export function useCrearDireccionUsuario() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (request: GuardarDireccionUsuarioType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            const response: GuardarDireccionUsuarioResponseType = await crearDireccionUsuario(request);

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
