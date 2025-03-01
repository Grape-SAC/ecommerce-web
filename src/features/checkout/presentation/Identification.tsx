'use client';

import styles from './Identification.module.css';
import { useRouter } from 'next/navigation';
import CheckoutStep from '@/components/ui/CheckoutStep/CheckoutStep';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
const Identification = () => {
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
            </form>
            <div className={styles.buttonContainer}>
                <Button
                    sx={{ mb: 1, backgroundColor: "primary.light", color: "primary.main" }}
                    fullWidth
                    onClick={() => router.back()}
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

export default Identification;