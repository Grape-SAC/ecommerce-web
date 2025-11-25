'use client';

import styles from './registrar-usuario-form.module.css';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormHelperText, Alert, AlertTitle, Button, Box, Divider, Typography, InputAdornment, SxProps, Theme } from '@mui/material';
import NProgress from 'nprogress';

import { useTiposDocumento } from '@/shared/document-types/hooks/use-tipos-documento';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { useEffect, useState } from 'react';
import { CrearCuentaRequestType } from '@/app/(auth)/crear-cuenta/types/crear-cuenta-request.type';
import { crearCuentaValidation } from '@/app/(auth)/crear-cuenta/validation/crear-cuenta.validation';
import { useCrearCuenta } from '@/app/(auth)/crear-cuenta/hooks/use-crear-cuenta';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';
import { CreditCard, Description, Email, Fingerprint, Lock, Person, Smartphone } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';

interface Props {
    onStartAsyncOperation?: (() => void) | null;
    redirectPath?: string;
    loadingSx?: SxProps<Theme>;
}

const RegistrarUsuarioForm = ({ onStartAsyncOperation, redirectPath = '/mi-cuenta', loadingSx }: Props) => {
    const router = useRouter();
    const { tiposDocumento } = useTiposDocumento();
    const { execute: doSignUp, loading, error } = useCrearCuenta();
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CrearCuentaRequestType>({
        resolver: yupResolver(crearCuentaValidation),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);

    const onSubmit = async (data: CrearCuentaRequestType) => {
        if (onStartAsyncOperation) {
            onStartAsyncOperation();
        }

        const ok = await doSignUp(data);

        if (ok) {
            router.push(redirectPath);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            {loading && <LoadingPage sx={loadingSx} />}
            <Controller
                name="nombres"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: !!errors.nombres ? 'center' : 'flex-end', mb: 2 }}>
                        <Person sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                        <TextField
                            {...field}
                            fullWidth
                            label="Nombres"
                            variant="standard"
                            margin="none"
                            error={!!errors.nombres}
                            helperText={errors.nombres?.message}
                        />
                    </Box>
                )}
            />

            <Controller
                name="apellidos"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: !!errors.apellidos ? 'center' : 'flex-end', mb: 2 }}>
                        <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                        <TextField
                            {...field}
                            fullWidth
                            label="Apellidos"
                            variant="standard"
                            margin="none"
                            error={!!errors.apellidos}
                            helperText={errors.apellidos?.message}
                        />
                    </Box>
                )}
            />

            <Controller
                name="correo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: !!errors.correo ? 'center' : 'flex-end', mb: 2 }}>
                        <Email sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                        <TextField
                            {...field}
                            fullWidth
                            label="Correo electrónico"
                            variant="standard"
                            margin="none"
                            type="email"
                            error={!!errors.correo}
                            helperText={errors.correo?.message}
                        />
                    </Box>
                )}
            />

            <Controller
                name="celular"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: !!errors.celular ? 'center' : 'flex-end', mb: 2 }}>
                        <Smartphone sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                        <TextField
                            {...field}
                            fullWidth
                            label="Celular"
                            variant="standard"
                            margin="none"
                            type="tel"
                            error={!!errors.celular}
                            helperText={errors.celular?.message}
                        />
                    </Box>
                )}
            />

            <Controller
                name="tipoDocumentoId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: !!errors.tipoDocumentoId ? 'center' : 'flex-end', mb: 2 }}>
                        <Description sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <FormControl
                            fullWidth
                            variant="standard"
                            error={!!errors.tipoDocumentoId}
                        >
                            <InputLabel id="document-type-label">Tipo de documento</InputLabel>
                            <Select
                                {...field}
                                labelId="document-type-label"
                                label="Tipo de documento"
                            >
                                {tiposDocumento.map(doc => (
                                    <MenuItem key={doc.id} value={doc.id}>
                                        {doc.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.tipoDocumentoId?.message}</FormHelperText>
                        </FormControl>
                    </Box>
                )} />

            <Controller
                name="numeroDocumento"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: !!errors.numeroDocumento ? 'center' : 'flex-end', mb: 2 }}>
                        <Fingerprint sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                        <TextField
                            {...field}
                            fullWidth
                            label="Número de documento"
                            variant="standard"
                            margin="none"
                            error={!!errors.numeroDocumento}
                            helperText={errors.numeroDocumento?.message}
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
                            margin="none"
                            type="password"
                            error={!!errors.clave}
                            helperText={errors.clave?.message}
                        />
                    </Box>
                )}
            />

            <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                <AlertTitle>Importante</AlertTitle>
                Crea una contraseña para registrar tu cuenta y así gestionar tus compras de forma más rápida y segura.
            </Alert>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={loading} sx={{ mt: 1 }}
                >
                    CONTINUAR
                </Button>
                <Divider>o</Divider>
                <Typography variant="body2" align="center" color="text.secondary">
                    ¿Ya tienes una cuenta?
                </Typography>
                <Button
                    variant="outlined" color="secondary"
                    fullWidth
                    onClick={() => {
                        NProgress.start();
                        router.push('/iniciar-sesion');
                    }}
                >
                    INICIA SESIÓN
                </Button>
            </Box>

            <InfoModal
                open={dialogOpen}
                onClose={handleCloseDialog}
                title="Informe de error"
                message={error}
            />
        </form>
    );
};

export default RegistrarUsuarioForm;
