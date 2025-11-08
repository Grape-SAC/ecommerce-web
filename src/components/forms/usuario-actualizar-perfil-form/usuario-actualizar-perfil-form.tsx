'use client';

import style from './usuario-actualizar-perfil-form.module.css';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import NProgress from 'nprogress';

import { UsuarioAutenticacionType } from '@/app/(auth)/register/types/usuario-autenticacion.type';
import { userProfileUpdateValidation as actualizarPerfilValidacion } from '@/app/mi-cuenta/profile/validation/actualizar-perfil.validation';
import { ActualizarPerfilType } from '@/app/mi-cuenta/profile/types/actualizar-perfil.type';
import { useUserProfileUpdate } from '@/app/mi-cuenta/profile/hooks/use-profile-update';
import { useTiposDocumento } from '@/shared/document-types/hooks/use-tipos-documento';
import InfoModal from '@/components/ui/info-modal/info-modal';

type Props = {
    usuarioAutenticacion: UsuarioAutenticacionType;
};

const ActualizarPerfilForm = ({ usuarioAutenticacion }: Props) => {
    const router = useRouter();
    const { tiposDocumento } = useTiposDocumento();
    const { execute: doUpdateUser, loading, error } = useUserProfileUpdate();
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ActualizarPerfilType>({
        resolver: yupResolver(actualizarPerfilValidacion),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (usuarioAutenticacion) {
            reset({
                nombres: usuarioAutenticacion.nombres,
                apellidoPaterno: usuarioAutenticacion.apellidoPaterno,
                apellidoMaterno: usuarioAutenticacion.apellidoMaterno,
                correo: usuarioAutenticacion.correo,
                celular: usuarioAutenticacion.celular,
                tipoDocumentoId: usuarioAutenticacion.tipoDocumentoId,
                numeroDocumento: usuarioAutenticacion.numeroDocumento,
            });
        }
    }, [usuarioAutenticacion, reset]);

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);

    const onSubmit = async (data: ActualizarPerfilType) => {
        NProgress.start();

        const ok = await doUpdateUser(data);

        if (ok) {
            router.push('/finalizar-compra/entrega');
        }
        
        NProgress.done();
    };

    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller name="nombres" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Nombres" variant="standard" error={!!errors.nombres} helperText={errors.nombres?.message} />
            )} />

            <Controller name="apellidoPaterno" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Apellido Paterno" variant="standard" margin='normal' error={!!errors.apellidoPaterno} helperText={errors.apellidoPaterno?.message} />
            )} />

            <Controller name="apellidoMaterno" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Apellido Materno" variant="standard" margin='normal' error={!!errors.apellidoMaterno} helperText={errors.apellidoMaterno?.message} />
            )} />

            <Controller name="correo" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Correo electrónico" variant="standard" margin='normal' type="email" error={!!errors.correo} helperText={errors.correo?.message} />
            )} />

            <Controller name="celular" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Teléfono" variant="standard" margin='normal' type="tel" error={!!errors.celular} helperText={errors.celular?.message} />
            )} />

            <Controller name="tipoDocumentoId" control={control} defaultValue="" render={({ field }) => (
                <FormControl fullWidth variant="standard" error={!!errors.tipoDocumentoId} sx={{ mt: 2 }}>
                    <InputLabel id="document-type-label">Tipo de documento</InputLabel>
                    <Select {...field} labelId="document-type-label" label="Tipo de documento">
                        {tiposDocumento.map((doc) => (
                            <MenuItem key={doc.id} value={doc.id}>
                                {doc.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.tipoDocumentoId?.message}</FormHelperText>
                </FormControl>
            )} />

            <Controller name="numeroDocumento" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Número de documento" variant="standard" margin='normal' type="text" error={!!errors.numeroDocumento} helperText={errors.numeroDocumento?.message} />
            )} />

            <div className={style.footer}>
                <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
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

export default ActualizarPerfilForm;
