'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Container, Snackbar } from '@mui/material';
import NProgress from 'nprogress';
import { IniciarSesionView } from './view/iniciar-sesion.view';
import { IniciarSesionRequestType } from './types/iniciar-sesion-request.type';
import { useIniciarSesion } from './hooks/use-iniciar-sesion';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { HttpStatus } from '@/shared/enum/http-status';

const IniciarSesionPage = () => {
    const router = useRouter();
    const { execute: doLogin, loading, error } = useIniciarSesion();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);

        const handlePopState = () => {
            router.replace('/');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);

    useEffect(() => {
        if (error == null) {
            return;
        }

        if (error.code === HttpStatus.UNAUTHORIZED) {
            setSnackbarOpen(true);
        } else {
            console.error("error prueba", error);
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);
    const handleCloseSnackbar = () => setSnackbarOpen(false);

    const handleLoginSubmit = async (data: IniciarSesionRequestType) => {
        const ok = await doLogin(data);

        if (ok) {
            router.push('/mi-cuenta');
        }
    };

    const handleNavigateRegister = () => {
        setIsNavigating(true);
        router.push('/crear-cuenta');
    };

    return (
        <Container>
            <IniciarSesionView
                onSubmit={handleLoginSubmit}
                isLoading={loading || isNavigating}
                onNavigateRegister={handleNavigateRegister}
            />

            <InfoModal
                open={dialogOpen}
                onClose={handleCloseDialog}
                title="Informe de error"
                message={error?.message || 'Ha ocurrido un error desconocido.'}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {error?.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default IniciarSesionPage;