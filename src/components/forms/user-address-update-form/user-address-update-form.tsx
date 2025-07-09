'use client';

import styles from './user-address-update-form.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    TextField, MenuItem, Select, FormControl, InputLabel,
    Button, Alert, AlertTitle, FormHelperText
} from '@mui/material';
import NProgress from 'nprogress';
import { useDepartmentList } from '@/shared/ubigeo/hooks/use-department-list';
import { useProvinceList } from '@/shared/ubigeo/hooks/use-province-list';
import { useDistrictList } from '@/shared/ubigeo/hooks/use-district-list';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { userAddressFormValidation } from '@/app/(no-ui)/account/address/validation/user-address-form.validation';
import { UserAddressFormType } from '@/app/(no-ui)/account/address/types/user-address-form.type';
import { UserAddressListType } from '@/app/(no-ui)/account/address/types/user-address-list.type';
import { useUserAddressUpdate } from '@/app/(no-ui)/account/address/hooks/use-user-address-update';
import { useDispatch } from 'react-redux';
import { setShippingPrice } from '@/store/slices/checkout.slice';

const UserAddressUpdateForm = ({ userAddress }: { userAddress: UserAddressListType }) => {
    const router = useRouter();
    const [departmentId, setDepartmentId] = useState(userAddress.departmentId.toString());
    const [provinceId, setProvinceId] = useState(userAddress.provinceId.toString());
    const [dialogOpen, setDialogOpen] = useState(false);

    const { departments } = useDepartmentList();
    const { provinces } = useProvinceList(departmentId);
    const { districts } = useDistrictList(provinceId);
    const { execute: doUserAddressUpdate, loading, error } = useUserAddressUpdate();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<UserAddressFormType>({
        resolver: yupResolver(userAddressFormValidation),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (userAddress) {
            reset({
                departmentId: userAddress.departmentId.toString(),
                provinceId: userAddress.provinceId.toString(),
                districtId: userAddress.districtId,
                address: userAddress.address,
                reference: userAddress.reference,
            });
        }
    }, [userAddress, reset]);

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);

    const onSubmit = async (data: UserAddressFormType) => {
        NProgress.start();

        const ok = await doUserAddressUpdate(userAddress.id, {
            ubigeoId: data.districtId,
            address: data.address,
            reference: data.reference,
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
                            error={!!errors.provinceId}
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
                            <FormHelperText>{errors.provinceId?.message}</FormHelperText>
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
                            error={!!errors.districtId}
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

                                    dispatch(setShippingPrice(deliveryPrice));
                                }}
                            >
                                {districts.map(x => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.name} - {x.deliveryPrice == null ? "S/. (Por Confirmar)" : "S/. " + x.deliveryPrice}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.districtId?.message}</FormHelperText>
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
                            error={!!errors.address}
                            helperText={errors.address?.message}
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
                            error={!!errors.reference}
                            helperText={errors.reference?.message}
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
