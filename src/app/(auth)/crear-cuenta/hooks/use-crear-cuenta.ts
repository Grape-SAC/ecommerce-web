import { useState, useCallback } from 'react';
import { CrearCuentaRequestType } from '../types/crear-cuenta-request.type';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/autenticacion.slice';
import { iniciarSesion } from '@/app/(auth)/iniciar-sesion/services/iniciar-sesion.service';
import { IniciarSesionRequestType } from '@/app/(auth)/iniciar-sesion/types/iniciar-sesion-request.type';
import { crearCuenta } from '../services/crear-cuenta.service';
import { UsuarioAutenticacionType } from '../../../../shared/types/usuario-autenticacion-response.type';
import NProgress from 'nprogress';

export function useCrearCuenta() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const execute = useCallback(async (crearCuentaRequest: CrearCuentaRequestType): Promise<boolean> => {
        setError(null);
        setLoading(true);
        NProgress.start();
        try {
            await crearCuenta(crearCuentaRequest);

            const iniciarSesionRequest: IniciarSesionRequestType = {
                usuario: crearCuentaRequest.correo,
                clave: crearCuentaRequest.clave
            }

            const usuarioResponse: UsuarioAutenticacionType = await iniciarSesion(iniciarSesionRequest);

            dispatch(setUser(usuarioResponse));

            return true;
        } catch (e: any) {
            setError(e.message || 'Error desconocido');
            setLoading(false);
            NProgress.done();
            return false;
        }
    }, [dispatch]);

    return { execute, loading, error };
}
