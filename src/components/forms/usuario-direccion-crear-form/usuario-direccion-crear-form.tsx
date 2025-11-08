'use client';

import styles from './usuario-direccion-crear-form.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Alert, AlertTitle, FormHelperText } from '@mui/material'
import NProgress from 'nprogress';
import { useListaDepartamentos } from '@/shared/ubigeo/hooks/use-lista-departamentos';
import { useListaProvincias } from '@/shared/ubigeo/hooks/use-lista-provincias';
import { useListaDistritos } from '@/shared/ubigeo/hooks/use-lista-distritos';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { useUserAddressCreate } from '@/app/mi-cuenta/address/hooks/use-user-address-create';
import { UsuarioDireccionFormType } from '@/app/mi-cuenta/address/types/usuario-direccion-form.type';
import { usuarioDireccionFormValidation } from '@/app/mi-cuenta/address/validation/usuario-direccion-form.validation';
import { UsuarioDireccionGuardarType } from '@/app/mi-cuenta/address/types/usuario-direccion-guardar.type';
import { useDispatch } from 'react-redux';
import { setPrecioEnvio } from '@/store/slices/finaliza-compra.slice';

const UsuarioDireccionCrearForm = () => {
    const router = useRouter();
    const [departamentoId, setDepartamentoId] = useState('');
    const [provinciaId, setProvinciaId] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const { departamentos } = useListaDepartamentos();
    const { provincias } = useListaProvincias(departamentoId);
    const { distritos } = useListaDistritos(provinciaId);
    const { execute: doUserAddressCreate, loading, error } = useUserAddressCreate();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UsuarioDireccionFormType>({
        resolver: yupResolver(usuarioDireccionFormValidation),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);

    const onSubmit = async (data: UsuarioDireccionFormType) => {
        NProgress.start();

        const request: UsuarioDireccionGuardarType = {
            ubigeoId: data.distritoId,
            direccion: data.direccion,
            referencia: data.referencia,
        };

        const ok: boolean = await doUserAddressCreate(request);

        if (ok) {
            router.push('/checkout/payment');
        }

        NProgress.done();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                    setDepartamentoId(value);
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
                                    setProvinciaId(value);
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
                                    const precioDelivery = selectedDistrict?.precioDelivery ?? 0;

                                    dispatch(setPrecioEnvio(precioDelivery));
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
                        SIGUIENTE
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
}

export default UsuarioDireccionCrearForm;