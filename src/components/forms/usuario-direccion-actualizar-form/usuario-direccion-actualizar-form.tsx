'use client';

import styles from './usuario-direccion-actualizar-form.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    TextField, MenuItem, Select, FormControl, InputLabel,
    Button, Alert, AlertTitle, FormHelperText
} from '@mui/material';
import NProgress from 'nprogress';
import { useListaDepartamentos } from '@/shared/ubigeo/hooks/use-lista-departamentos';
import { useListaProvincias } from '@/shared/ubigeo/hooks/use-lista-provincias';
import { useListaDistritos } from '@/shared/ubigeo/hooks/use-lista-distritos';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { usuarioDireccionFormValidation } from '@/app/mi-cuenta/address/validation/usuario-direccion-form.validation';
import { UsuarioDireccionFormType } from '@/app/mi-cuenta/address/types/usuario-direccion-form.type';
import { UserAddressListType } from '@/app/mi-cuenta/address/types/user-address-list.type';
import { useUserAddressUpdate } from '@/app/mi-cuenta/address/hooks/use-user-address-update';
import { useDispatch } from 'react-redux';
import { setPrecioEnvio } from '@/store/slices/finaliza-compra.slice';

const UserAddressUpdateForm = ({ userAddress }: { userAddress: UserAddressListType }) => {
    const router = useRouter();
    const [departmentId, setDepartmentId] = useState(userAddress.departmentId.toString());
    const [provinceId, setProvinceId] = useState(userAddress.provinceId.toString());
    const [dialogOpen, setDialogOpen] = useState(false);

    const { departments } = useListaDepartamentos();
    const { provinces } = useListaProvincias(departmentId);
    const { districts } = useListaDistritos(provinceId);
    const { execute: doUserAddressUpdate, loading, error } = useUserAddressUpdate();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<UsuarioDireccionFormType>({
        resolver: yupResolver(usuarioDireccionFormValidation),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (userAddress) {
            reset({
                departmentId: userAddress.departmentId.toString(),
                provinciaId: userAddress.provinceId.toString(),
                distritoId: userAddress.districtId,
                direccion: userAddress.address,
                referencia: userAddress.reference,
            });
        }
    }, [userAddress, reset]);

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);

    const onSubmit = async (data: UsuarioDireccionFormType) => {
        NProgress.start();

        const ok = await doUserAddressUpdate(userAddress.id, {
            ubigeoId: data.distritoId,
            direccion: data.direccion,
            referencia: data.referencia,
        });

        if (ok) {
            router.push('/checkout/payment');
        }

        NProgress.done();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="departmentId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <FormControl
                            fullWidth
                            variant="standard"
                            error={!!errors.departmentId}
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
                                    setValue('provinceId', '');
                                    setValue('districtId', '');
                                }}
                            >
                                {departments.map(x => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.departmentId?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="provinceId"
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
                                    setValue('districtId', '');
                                }}
                            >
                                {provinces.map(x => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.provinciaId?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="districtId"
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
                                    const selectedDistrict = districts.find(x => x.id === value);
                                    const deliveryPrice = selectedDistrict?.deliveryPrice ?? 0;

                                    dispatch(setPrecioEnvio(deliveryPrice));
                                }}
                            >
                                {districts.map(x => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.name} - {x.deliveryPrice == null ? "S/. (Por Confirmar)" : "S/. " + x.deliveryPrice}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.distritoId?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="address"
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
                    name="reference"
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
};

export default UserAddressUpdateForm;
