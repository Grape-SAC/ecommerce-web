'use client';

import styles from './identification.module.css';
import { useRouter } from 'next/navigation';
import CheckoutStep from '@/shared/components/ui/CheckoutStep/CheckoutStep';
import { Alert, AlertTitle, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const IdentificationView = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <CheckoutStep currentStep={0} />
            <h2 className={styles.title}>MI IDENTIFICACIÓN</h2>
            <form className={styles.formContainer}>
                <TextField
                    fullWidth
                    label="Nombres"
                    variant="standard"
                />
                <div className={styles.lastnameRow}>
                    <TextField
                        fullWidth
                        label="Apellido Paterno"
                        variant="standard"
                        margin='normal'
                    />
                    <TextField
                        fullWidth
                        label="Apellido Materno"
                        variant="standard"
                        margin='normal'
                    />
                </div>
                <TextField
                    fullWidth
                    label="Correo electrónico"
                    variant="standard"
                    margin='normal'
                    type="email"
                />
                <TextField
                    fullWidth
                    label="Teléfono"
                    variant="standard"
                    margin='normal'
                    type="tel"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label" sx={{ left: "-12px" }}>Tipo de documento</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Tipo de documento"
                        variant="standard"
                    >
                        <MenuItem value="tipo1">Tipo de documento 1</MenuItem>
                        <MenuItem value="tipo2">Tipo de documento 2</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Número de documento"
                    variant="standard"
                    margin='normal'
                    type="number"
                />
                <TextField
                    fullWidth
                    label="Contraseña"
                    variant="standard"
                    margin="normal"
                    type="password"
                />
            </form>
            <Alert severity="info">
                <AlertTitle>Importante</AlertTitle>
                Crea una contraseña para registrar tu cuenta y así gestionar tus compras de forma más rápida y segura.
            </Alert>
            <div className={styles.buttonContainer}>
                <Button
                    sx={{ mb: 1, backgroundColor: "primary.light", color: "primary.main" }}
                    fullWidth
                    onClick={() => router.push("/cart")}
                >
                    REGRESAR
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => router.push("/checkout/delivery")}
                >
                    SIGUIENTE
                </Button>
            </div>
        </div>
    );
}

export default IdentificationView;