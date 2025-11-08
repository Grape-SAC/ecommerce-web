'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from './confirmacion-compra.module.css';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRef } from 'react';

const ConfirmacionCompraPage = () => {
    const router = useRouter();
    const playerRef = useRef<any>(null);

    return (
        <div className={styles.container}>
            <div className={styles.lottieWrapper}>
                <div className={styles.lottieWrapper}>
                    <Player
                        ref={playerRef}
                        autoplay
                        loop={false}
                        keepLastFrame
                        src="/animated/success-check.json"
                        style={{ height: '120px', width: '120px' }}
                        onEvent={(event) => {
                            if (event === 'complete') {
                                playerRef.current?.pause(); // asegúrate que no desaparezca
                            }
                        }}
                    />
                </div>
            </div>
            <h1 className={styles.title}>¡Gracias por tu compra!</h1>
            <p className={styles.subtitle}>
                Tu pedido fue recibido con éxito. Pronto te enviaremos los detalles a tu correo electrónico.
            </p>

            <div className={styles.actions}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => router.push('/mis-pedidos')}
                >
                    Ver mis pedidos
                </Button>

                <Button
                    sx={{ mt: 1, backgroundColor: "primary.light", color: "primary.main" }}
                    fullWidth
                    onClick={() => router.push('/')}
                >
                    Volver al inicio
                </Button>
            </div>
        </div>
    );
};

export default ConfirmacionCompraPage;
