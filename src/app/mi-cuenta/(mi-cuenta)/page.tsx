'use client';

import { useRouter } from 'next/navigation';
import styles from './view/mi-cuenta.module.css';
import { KeyIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import MiCuentaView from './view/mi-cuenta.view';
import { logout } from '@/store/slices/autenticacion.slice';
import { cerrarSesion } from './services/cerrar-sesion.service';

const MiCuentaPage = () => {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const { usuario } = useSelector((state: RootState) => state.auth);

    const opciones = [
        { label: 'Mis datos personales', icon: <UserIcon className={styles.icono} />, path: '/mi-cuenta/datos-personales' },
        { label: 'Mis direcciones', icon: <MapPinIcon className={styles.icono} />, path: '/mi-cuenta/direcciones' },
        { label: 'Cambiar mi contraseña', icon: <KeyIcon className={styles.icono} />, path: '/mis-pedidos' },
    ];

    const handleOptionClick = (path: string) => {
        router.push(path);
    };

    const handleLogout = async () => {
        // 1. Llamar al backend para destruir las cookies httpOnly
        await cerrarSesion();

        // 2. Despachar la acción de Redux (limpia el estado del frontend)
        dispatch(logout());

        // 3. Redirigir
        router.push('/');
    };

    // if (!usuario) {
    //     return <LoadingPage />;
    // }

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
