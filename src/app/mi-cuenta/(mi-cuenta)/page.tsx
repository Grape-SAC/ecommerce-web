'use client';

import PageHeader from '@/components/ui/page-header/page-header';
import { Button, List, ListItem, ListItemText, Typography, Divider, Box, Card } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from './mi-cuenta.module.css';
import Image from 'next/image';

const MiCuentaPage = () => {
    const router = useRouter();

    const opciones = [
        { label: 'Mis datos personales', path: '/account/personal-info' },
        { label: 'Mis direcciones', path: '/account/addresses' },
        { label: 'Cambiar mi contraseña', path: '/mis-pedidos' },
    ];

    return (
        <section className={styles.accountContainer}>
            <div className={styles.profileContainer}>
                <Image
                    src="/profile_user.jpg"
                    alt="Logo de Ecommerce"
                    className={styles.profileImage}
                    width={100}
                    height={100}
                />
                <h1 className={styles.profileName}>Jonathan Perez Grados</h1>
                <p className={styles.profileEmail}>perezgradosj@gmail.com</p>
            </div>

            <List>
                {opciones.map((opcion, index) => (
                    <Box key={opcion.label}>
                        <ListItem
                            component="button"
                            onClick={() => router.push(opcion.path)}
                            sx={{ textAlign: 'left' }} // Opcional para que se vea alineado al texto
                        >
                            <ListItemText primary={opcion.label} />
                        </ListItem>
                        {index !== opciones.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </section>
    );
};

export default MiCuentaPage;
