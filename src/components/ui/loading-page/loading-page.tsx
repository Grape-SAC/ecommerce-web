

import { Box, CircularProgress, SxProps, Theme } from '@mui/material';
import NProgress from 'nprogress';
import { useEffect } from 'react';

interface Props {
    sx?: SxProps<Theme>; // Aún permitimos sobrescribir si fuera necesario
}

export const LoadingPage = ({ sx }: Props) => {
    // Inicia la barra de progreso superior
    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        };
    }, []);

    // Muestra un spinner centrado
    return (
        <Box
            sx={{
                // Estilos base para comportamiento de Overlay
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgb(255 255 255 / 57%)', // Fondo semitransparente
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1,
                minHeight: '100%', // Asegura que cubra el alto del padre
                ...sx // Permite sobrescribir estilos desde fuera
            }}
        >
            {/* Aquí va tu spinner, imagen o lo que uses de carga */}
            <CircularProgress color="primary" />
        </Box>
    );
}