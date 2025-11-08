'use client';

import styles from './usuario-registrar-form.module.css';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormHelperText, Alert, AlertTitle, Button } from '@mui/material';
import NProgress from 'nprogress';

import { UsuarioRegistrarRequestType } from '@/app/(auth)/register/types/usuario-registrar-request.type';
import { useTiposDocumento } from '@/shared/document-types/hooks/use-tipos-documento';
import { usuarioRegistrarValidation } from '@/app/(auth)/register/validation/registro-usuario.validation';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { useEffect, useState } from 'react';
import { useSignUp } from '@/app/(auth)/register/hooks/use-sign-up';

const RegistroUsuarioForm = () => {
    const router = useRouter();
    const { tiposDocumento } = useTiposDocumento();
    const { execute: doSignUp, loading, error } = useSignUp();
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UsuarioRegistrarRequestType>({
        resolver: yupResolver(usuarioRegistrarValidation),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);

    const onSubmit = async (data: UsuarioRegistrarRequestType) => {
        NProgress.start();

        const ok = await doSignUp(data);

        if (ok) {
            router.push('/finalizar-compra/entrega');
        }

        NProgress.done();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="nombres"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Nombres"
                        variant="standard"
                        error={!!errors.nombres}
                        helperText={errors.nombres?.message}
                    />
                )}
            />

            <Controller
                name="apellidoPaterno"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Apellido Paterno"
                        variant="standard"
                        margin="normal"
                        error={!!errors.apellidoPaterno}
                        helperText={errors.apellidoPaterno?.message}
                    />
                )}
            />

            <Controller
                name="apellidoMaterno"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Apellido Materno"
                        variant="standard"
                        margin="normal"
                        error={!!errors.apellidoMaterno}
                        helperText={errors.apellidoMaterno?.message}
                    />
                )}
            />

            <Controller
                name="correo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Correo electrónico"
                        variant="standard"
                        margin="normal"
                        type="email"
                        error={!!errors.correo}
                        helperText={errors.correo?.message}
                    />
                )}
            />

            <Controller
                name="celular"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Teléfono"
                        variant="standard"
                        margin="normal"
                        type="tel"
                        error={!!errors.celular}
                        helperText={errors.celular?.message}
                    />
                )}
            />

            <Controller
                name="tipoDocumentoId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <FormControl
                        fullWidth
                        variant="standard"
                        error={!!errors.tipoDocumentoId}
                        sx={{ mt: 2 }}
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
                )} />

            <Controller
                name="numeroDocumento"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Número de documento"
                        variant="standard"
                        margin="normal"
                        error={!!errors.numeroDocumento}
                        helperText={errors.numeroDocumento?.message}
                    />
                )}
            />

            <Controller
                name="clave"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Contraseña"
                        variant="standard"
                        margin="normal"
                        type="password"
                        error={!!errors.clave}
                        helperText={errors.clave?.message}
                    />
                )}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
                <AlertTitle>Importante</AlertTitle>
                Crea una contraseña para registrar tu cuenta y así gestionar tus compras de forma más rápida y segura.
            </Alert>

            <div className={styles.buttonContainer}>
                <Button
                    sx={{ mt: 1, backgroundColor: "secondary.light", color: "secondary.main" }}
                    fullWidth
                    onClick={() => {
                        NProgress.start();
                        router.push('/iniciar-sesion');
                    }}
                >
                    YA TENGO UNA CUENTA
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={loading} sx={{ mt: 1 }}
                >
                    SIGUIENTE
                </Button>
            </div>

            <InfoModal
                open={dialogOpen}
                onClose={handleCloseDialog}
                title="Informe de error"
                message={error}
            />
        </form>
    );
};

export default RegistroUsuarioForm;
