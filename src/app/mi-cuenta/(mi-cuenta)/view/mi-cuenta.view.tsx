'use client';

import { List, ListItem, ListItemText, Divider, Box, Card, ListItemIcon } from '@mui/material';
import styles from './mi-cuenta.module.css';
import Image from 'next/image';
import { ArrowRightEndOnRectangleIcon, KeyIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';

const toTitleCase = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

interface MiCuentaViewProps {
    usuario: UsuarioAutenticacionType | null;
    opciones: {
        label: string;
        icon: React.ReactNode;
        path: string;
    }[];
    onOptionClick: (path: string) => void;
    onLogoutClick: () => void;
}

const MiCuentaView = ({ usuario, opciones, onOptionClick, onLogoutClick }: MiCuentaViewProps) => {
    const toTitleCase = (str: string): string => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    return (
        <section className={styles.accountContainer}>
            {/* {!usuario && <LoadingPage />} */}
            <div className={styles.profileContainer}>
                <Image
                    src="/profile_user.jpg"
                    alt="Logo de Ecommerce"
                    className={styles.profileImage}
                    width={100}
                    height={100}
                />
                <h1 className={styles.profileName}>{usuario ? `${toTitleCase(usuario.nombres)} ${toTitleCase(usuario.apellidos)}` : 'Bienvenido'}</h1>
                <p className={styles.profileEmail}>{usuario ? usuario.correo.toLowerCase() : 'Cargando...'}</p>
            </div>

            <List>
                {opciones.map((opcion, index) => (
                    <Box key={opcion.label}>
                        <ListItem
                            component="button"
                            onClick={() => onOptionClick(opcion.path)}
                            sx={{ textAlign: 'left' }} // Opcional para que se vea alineado al texto
                        >
                            <ListItemIcon className={styles.iconoLista}>
                                {opcion.icon}
                            </ListItemIcon>
                            <ListItemText primary={opcion.label} />
                        </ListItem>
                        {index !== opciones.length - 1 && <Divider />}
                    </Box>
                ))}
                <Divider />
                <ListItem
                    component="button"
                    onClick={onLogoutClick}
                    sx={{
                        textAlign: 'left',
                        width: '100%',
                        color: 'error.main'
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit' }} className={styles.iconoLista}>
                        <ArrowRightEndOnRectangleIcon className={styles.icono} />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar sesión" />
                </ListItem>
            </List>
        </section>
    );
};

export default MiCuentaView;
