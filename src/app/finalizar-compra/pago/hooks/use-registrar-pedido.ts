import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { RegistrarPedidoType } from '../types/registrar-pedido.type';
import { registrarPedido } from '../services/registrar-pedido.service';

export function useRegistrarPedido() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (request: RegistrarPedidoType, archivoComprobante?: File): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            await registrarPedido(request, archivoComprobante);
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
