'use client';

import style from './actualizar-perfil-usuario-form.module.css';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Box, Badge } from '@mui/material';

import { useTiposDocumento } from '@/shared/document-types/hooks/use-tipos-documento';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';
import { ActualizarPerfilType } from '@/app/mi-cuenta/datos-personales/types/actualizar-datos-personales.type';
import { actualizarDatosPersonalesValidation } from '@/app/mi-cuenta/datos-personales/validation/actualizar-datos-personales.validation';
import { useActualizarDatosPersonales } from '@/app/mi-cuenta/datos-personales/hooks/use-actualizar-datos-personales';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';
import { Description, Email, Fingerprint, Person, Smartphone } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';

type Props = {
    usuarioAutenticacion: UsuarioAutenticacionType;
};

const ActualizarPerfilForm = ({ usuarioAutenticacion }: Props) => {
    const router = useRouter();
    const { tiposDocumento } = useTiposDocumento();
    const { execute: doUpdateUser, loading, error } = useActualizarDatosPersonales();
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ActualizarPerfilType>({
        resolver: yupResolver(actualizarDatosPersonalesValidation),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (usuarioAutenticacion) {
            reset({
                nombres: usuarioAutenticacion.nombres,
                apellidos: usuarioAutenticacion.apellidos,
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
        const ok = await doUpdateUser(data);

        if (ok) {
            router.push('/finalizar-compra/entrega');
        }
    };

    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            {loading && <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />}

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
                            margin="normal"
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
                            margin="normal"
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
                            margin="normal"
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
                            margin="normal"
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
                            margin="normal"
                            error={!!errors.numeroDocumento}
                            helperText={errors.numeroDocumento?.message}
                        />
                    </Box>
                )}
            />

            <div className={style.footer}>
                <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
                    CONTINUAR
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
