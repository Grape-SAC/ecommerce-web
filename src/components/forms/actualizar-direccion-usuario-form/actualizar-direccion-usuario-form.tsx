'use client';

import styles from './actualizar-direccion-usuario-form.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    TextField, MenuItem, Select, FormControl, InputLabel,
    Button, Alert, AlertTitle, FormHelperText
} from '@mui/material';
import { useListaDepartamentos } from '@/shared/ubigeo/hooks/use-lista-departamentos';
import { useListaProvincias } from '@/shared/ubigeo/hooks/use-lista-provincias';
import { useListaDistritos } from '@/shared/ubigeo/hooks/use-lista-distritos';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { useDispatch } from 'react-redux';
import { setPrecioEnvio } from '@/store/slices/finaliza-compra.slice';
import { ListaDireccionesUsuarioType } from '@/app/mi-cuenta/direcciones/types/lista-direcciones-usuario.type';
import { useActualizarDireccionUsuario } from '@/app/mi-cuenta/direcciones/hooks/use-actualizar-direccion-usuario';
import { DireccionUsuarioFormType } from '@/app/mi-cuenta/direcciones/types/direccion-usuario-form.type';
import { usuarioDireccionFormValidation } from '@/app/mi-cuenta/direcciones/validation/usuario-direccion-form.validation';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';

const ActualizarDireccionUsuarioForm = ({ direccionUsuario }: { direccionUsuario: ListaDireccionesUsuarioType }) => {
    const router = useRouter();
    const [departmentId, setDepartmentId] = useState(direccionUsuario.departamentoId.toString());
    const [provinceId, setProvinceId] = useState(direccionUsuario.provinciaId.toString());
    const [dialogOpen, setDialogOpen] = useState(false);

    const { departamentos } = useListaDepartamentos();
    const { provincias } = useListaProvincias(departmentId);
    const { distritos } = useListaDistritos(provinceId);
    const { execute: doUserAddressUpdate, loading, error } = useActualizarDireccionUsuario();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<DireccionUsuarioFormType>({
        resolver: yupResolver(usuarioDireccionFormValidation),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (direccionUsuario) {
            reset({
                departamentoId: direccionUsuario.departamentoId.toString(),
                provinciaId: direccionUsuario.provinciaId.toString(),
                distritoId: direccionUsuario.distritoId,
                direccion: direccionUsuario.direccion,
                referencia: direccionUsuario.referencia,
            });
        }
    }, [direccionUsuario, reset]);

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);

    const onSubmit = async (data: DireccionUsuarioFormType) => {
        const ok = await doUserAddressUpdate(direccionUsuario.id, {
            ubigeoId: data.distritoId,
            direccion: data.direccion,
            referencia: data.referencia,
        });

        if (ok) {
            router.push('/finalizar-compra/pago');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {loading && <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />}

                <Controller
                    name="departamentoId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <FormControl
                            fullWidth
                            variant="standard"
                            error={!!errors.departamentoId}
                            sx={{ mt: 2 }}
                        >
                            <InputLabel id="select-department-label">Departamento</InputLabel>
                            <Select
                                {...field}
                                labelId="select-department-label"
                                label="Departamento"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value);
                                    setDepartmentId(value);
                                    setValue('provinciaId', '');
                                    setValue('distritoId', '');
                                }}
                            >
                                {departamentos.map(x => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.departamentoId?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="provinciaId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <FormControl
                            fullWidth
                            variant="standard"
                            error={!!errors.provinciaId}
                            sx={{ mt: 2 }}
                        >
                            <InputLabel id="select-province-label">Provincia</InputLabel>
                            <Select
                                {...field}
                                labelId="select-province-label"
                                label="Provincia"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value);
                                    setProvinceId(value);
                                    setValue('distritoId', '');
                                }}
                            >
                                {provincias.map(x => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.provinciaId?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="distritoId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <FormControl
                            fullWidth
                            variant="standard"
                            error={!!errors.distritoId}
                            sx={{ mt: 2 }}
                        >
                            <InputLabel id="select-district-label">Distrito</InputLabel>
                            <Select
                                {...field}
                                labelId="select-district-label"
                                label="Distrito"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value);
                                    const selectedDistrict = distritos.find(x => x.id === value);
                                    const precioEnvio = selectedDistrict?.precioDelivery ?? 0;

                                    dispatch(setPrecioEnvio(precioEnvio));
                                }}
                            >
                                {distritos.map(x => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.nombre} - {x.precioDelivery == null ? "S/. (Por Confirmar)" : "S/. " + x.precioDelivery}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.distritoId?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="direccion"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Dirección"
                            variant="standard"
                            margin="normal"
                            error={!!errors.direccion}
                            helperText={errors.direccion?.message}
                        />
                    )}
                />

                <Controller
                    name="referencia"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Referencia"
                            variant="standard"
                            margin="normal"
                            multiline
                            rows={3}
                            error={!!errors.referencia}
                            helperText={errors.referencia?.message}
                        />
                    )}
                />

                <Alert severity="warning">
                    <AlertTitle>Entrega estimada</AlertTitle>
                    En hasta 3 días hábiles.
                </Alert>

                <div className={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        disabled={loading}
                    >
                        CONTINUAR
                    </Button>
                </div>
            </form>

            <InfoModal
                open={dialogOpen}
                onClose={handleCloseDialog}
                title="Informe de error"
                message={error}
            />
        </div>
    );
};

export default ActualizarDireccionUsuarioForm;
