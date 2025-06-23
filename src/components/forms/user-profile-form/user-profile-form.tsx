'use client';

import style from './user-profile-form.module.css';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import NProgress from 'nprogress';

import { AuthUserResponseType } from '@/app/(no-ui)/auth/register/types/auth-user-response.type';
import { userProfileUpdateValidation } from '@/app/(no-ui)/user/profile/validation/user-profile-update.validation';
import { UserProfileUpdateType } from '@/app/(no-ui)/user/profile/types/user-profile-update.type';
import { useUserProfileUpdate } from '@/app/(no-ui)/user/profile/hooks/use-profile-update';
import { useDocumentTypes } from '@/shared/document-types/hooks/use-document-types';
import InfoModal from '@/components/ui/info-modal/info-modal';

type Props = {
    authUser: AuthUserResponseType;
};

const UserProfileUpdateForm = ({ authUser }: Props) => {
    const router = useRouter();
    const { documentTypes } = useDocumentTypes();
    const { execute: doUpdateUser, loading, error } = useUserProfileUpdate();
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserProfileUpdateType>({
        resolver: yupResolver(userProfileUpdateValidation),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (authUser) {
            reset({
                names: authUser.names,
                paternalLastname: authUser.paternalLastname,
                maternalLastname: authUser.maternalLastname,
                email: authUser.email,
                cellphone: authUser.cellphone,
                documentTypeId: authUser.documentTypeId,
                documentNumber: authUser.documentNumber,
            });
        }
    }, [authUser, reset]);

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);

    const onSubmit = async (data: UserProfileUpdateType) => {
        NProgress.start();

        const ok = await doUpdateUser(data);

        if (ok) {
            router.push('/checkout/delivery');
        }
        
        NProgress.done();
    };

    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller name="names" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Nombres" variant="standard" error={!!errors.names} helperText={errors.names?.message} />
            )} />

            <Controller name="paternalLastname" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Apellido Paterno" variant="standard" margin='normal' error={!!errors.paternalLastname} helperText={errors.paternalLastname?.message} />
            )} />

            <Controller name="maternalLastname" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Apellido Materno" variant="standard" margin='normal' error={!!errors.maternalLastname} helperText={errors.maternalLastname?.message} />
            )} />

            <Controller name="email" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Correo electrónico" variant="standard" margin='normal' type="email" error={!!errors.email} helperText={errors.email?.message} />
            )} />

            <Controller name="cellphone" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Teléfono" variant="standard" margin='normal' type="tel" error={!!errors.cellphone} helperText={errors.cellphone?.message} />
            )} />

            <Controller name="documentTypeId" control={control} defaultValue="" render={({ field }) => (
                <FormControl fullWidth variant="standard" error={!!errors.documentTypeId} sx={{ mt: 2 }}>
                    <InputLabel id="document-type-label">Tipo de documento</InputLabel>
                    <Select {...field} labelId="document-type-label" label="Tipo de documento">
                        {documentTypes.map((doc) => (
                            <MenuItem key={doc.id} value={doc.id}>
                                {doc.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.documentTypeId?.message}</FormHelperText>
                </FormControl>
            )} />

            <Controller name="documentNumber" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Número de documento" variant="standard" margin='normal' type="text" error={!!errors.documentNumber} helperText={errors.documentNumber?.message} />
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

export default UserProfileUpdateForm;
