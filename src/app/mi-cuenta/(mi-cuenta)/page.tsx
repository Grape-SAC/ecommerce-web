'use client';

import { useRouter } from 'next/navigation';
import styles from './view/mi-cuenta.module.css';
import { KeyIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import MiCuentaView from './view/mi-cuenta.view';
import { logout } from '@/store/slices/autenticacion.slice';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { cerrarSesion } from './services/cerrar-sesion.service';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';

const MiCuentaPage = () => {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const { usuario, isLoading } = useSelector((state: RootState) => state.auth);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        // Si YA NO está cargando (terminó useAutenticacion)
        // Y el usuario sigue siendo null
        if (!isLoading && usuario === null && !isLoggingOut) {
            NProgress.start();
            router.push('/iniciar-sesion');
        }
    }, [isLoading, usuario, router, isLoggingOut]);

    const opciones = [
        { label: 'Mis datos personales', icon: <UserIcon className={styles.icono} />, path: '/mi-cuenta/datos-personales' },
        { label: 'Mis direcciones', icon: <MapPinIcon className={styles.icono} />, path: '/mi-cuenta/direcciones' },
        { label: 'Cambiar mi contraseña', icon: <KeyIcon className={styles.icono} />, path: '/mis-pedidos' },
    ];

    const handleOptionClick = (path: string) => {
        NProgress.start();
        router.push(path);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        NProgress.start();

        try {
            // 1. Llamar al backend para destruir las cookies httpOnly
            await cerrarSesion();

            // 2. Despachar la acción de Redux (limpia el estado del frontend)
            dispatch(logout());

            // 3. Redirigir
            router.push('/');

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setIsLoggingOut(false);
        } finally {
            NProgress.done();
        }
    };

    // if (isLoading) {
    //     return <LoadingPage />;
    // }

    if (!usuario) {
        return <LoadingPage />; // Pantalla blanca
    }

    return (
        <MiCuentaView
            usuario={usuario}
            opciones={opciones}
            onOptionClick={handleOptionClick}
            onLogoutClick={handleLogout}
        />
    );
};

export default MiCuentaPage;
