'use client';

import styles from './register-form.module.css';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormHelperText, Alert, AlertTitle, Button } from '@mui/material';
import NProgress from 'nprogress';

import { SignUpRequestType } from '@/app/(no-ui)/auth/register/types/sign-up-request.type';
import { useSignUp } from '@/app/(no-ui)/auth/register/hooks/use-sign-up';
import { useDocumentTypes } from '@/shared/document-types/hooks/use-document-types';
import { signUpValidation } from '@/app/(no-ui)/auth/register/validation/sign-up.validation';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { useEffect, useState } from 'react';

const RegisterForm = () => {
    const router = useRouter();
    const { documentTypes } = useDocumentTypes();
    const { execute: doSignUp, loading, error } = useSignUp();
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpRequestType>({
        resolver: yupResolver(signUpValidation),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    const handleCloseDialog = () => setDialogOpen(false);

    const onSubmit = async (data: SignUpRequestType) => {
        NProgress.start();

        const ok = await doSignUp(data);

        if (ok) {
            router.push('/checkout/delivery');
        }

        NProgress.done();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="names" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Nombres" variant="standard" error={!!errors.names} helperText={errors.names?.message} />
            )} />

            <Controller name="paternalLastname" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Apellido Paterno" variant="standard" margin="normal" error={!!errors.paternalLastname} helperText={errors.paternalLastname?.message} />
            )} />

            <Controller name="maternalLastname" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Apellido Materno" variant="standard" margin="normal" error={!!errors.maternalLastname} helperText={errors.maternalLastname?.message} />
            )} />

            <Controller name="email" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Correo electrónico" variant="standard" margin="normal" type="email" error={!!errors.email} helperText={errors.email?.message} />
            )} />

            <Controller name="cellphone" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Teléfono" variant="standard" margin="normal" type="tel" error={!!errors.cellphone} helperText={errors.cellphone?.message} />
            )} />

            <Controller name="documentTypeId" control={control} defaultValue="" render={({ field }) => (
                <FormControl fullWidth variant="standard" error={!!errors.documentTypeId} sx={{ mt: 2 }}>
                    <InputLabel id="document-type-label">Tipo de documento</InputLabel>
                    <Select {...field} labelId="document-type-label" label="Tipo de documento">
                        {documentTypes.map(doc => (
                            <MenuItem key={doc.id} value={doc.id}>
                                {doc.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.documentTypeId?.message}</FormHelperText>
                </FormControl>
            )} />

            <Controller name="documentNumber" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Número de documento" variant="standard" margin="normal" error={!!errors.documentNumber} helperText={errors.documentNumber?.message} />
            )} />

            <Controller name="password" control={control} defaultValue="" render={({ field }) => (
                <TextField {...field} fullWidth label="Contraseña" variant="standard" margin="normal" type="password" error={!!errors.password} helperText={errors.password?.message} />
            )} />

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
                        router.push('/auth/login');
                    }}
                >
                    YA TENGO UNA CUENTA
                </Button>
                <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading} sx={{ mt: 3 }}>
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

export default RegisterForm;
