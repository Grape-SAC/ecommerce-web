'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField, Button, InputAdornment, IconButton, Typography, Divider, Box
} from '@mui/material';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { IniciarSesionRequestType } from '../types/iniciar-sesion-request.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { iniciarSesionValidation } from '../validation/iniciar-sesion.validation';
import Image from 'next/image';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';
import { Lock, Person } from '@mui/icons-material';

interface Props {
    onSubmit: (data: IniciarSesionRequestType) => void;
    isLoading?: boolean;
    onNavigateRegister: () => void;
}

export const IniciarSesionView = ({ onSubmit, isLoading = false, onNavigateRegister }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IniciarSesionRequestType>({
        resolver: yupResolver(iniciarSesionValidation),
        mode: 'onTouched',
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Box sx={{ maxWidth: '400px', mx: 'auto', p: 1 }} style={{ position: 'relative' }}>
            {isLoading && <LoadingPage />}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Box sx={{
                    width: '100%',
                    maxWidth: 300,
                    height: 300, // <--- CORRECCIÓN: Definir la altura
                    mx: 'auto',
                    position: 'relative',
                    mb: 2
                }}>
                    <Image
                        src='/images/login.svg'
                        alt='Login Illustration'
                        fill
                        style={{ objectFit: 'contain' }}
                        loading="lazy"
                    />
                </Box>
                <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 1 }}>
                    INICIAR SESIÓN
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <Controller
                    name="usuario"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Box sx={{ display: 'flex', alignItems: !!errors.usuario ? 'center' : 'flex-end', mb: 2 }}>
                            <Person sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                            <TextField
                                {...field}
                                fullWidth
                                label="Correo, número de documento o celular"
                                variant="standard"
                                type="text"
                                error={!!errors.usuario}
                                helperText={errors.usuario?.message}
                            />
                        </Box>
                    )}
                />

                <Controller
                    name="clave"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Box sx={{ display: 'flex', alignItems: !!errors.clave ? 'center' : 'flex-end', mb: 2 }}>
                            <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                            <TextField
                                {...field}
                                fullWidth
                                label="Contraseña"
                                variant="standard"
                                type={showPassword ? 'text' : 'password'}
                                error={!!errors.clave}
                                helperText={errors.clave?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <EyeSlashIcon width={20} /> : <EyeIcon width={20} />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    )}
                />

                <Box sx={{ textAlign: 'right', mt: 1, mb: 2 }}>
                    <Link href="/recuperar-clave" style={{ color: '#666', textDecoration: 'none', fontSize: '0.875rem' }}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="contained" color="primary" fullWidth size="large" type="submit" disabled={isLoading}>
                        {isLoading ? 'INGRESANDO...' : 'INGRESAR'}
                    </Button>

                    <Divider>o</Divider>

                    <Typography variant="body2" align="center" color="text.secondary">
                        ¿Aún no tienes una cuenta?
                    </Typography>

                    <Button variant="outlined" color="secondary" fullWidth size="large" onClick={onNavigateRegister}>
                        CREAR CUENTA
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};