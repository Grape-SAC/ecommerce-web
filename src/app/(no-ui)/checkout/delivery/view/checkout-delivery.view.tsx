'use client';

import CheckoutStep from '@/components/ui/checkout-step/checkout-step';
import styles from './checkout-delivery.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, RadioGroup, FormControlLabel, Radio, Box, Alert, AlertTitle } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NProgress from 'nprogress';
import PageHeader from '@/components/ui/page-header/page-header';

const CheckoutDeliveryView = () => {
    const router = useRouter();
    const [deliveryMethod, setDeliveryMethod] = useState('domicilio');
    const [reference, setReference] = useState('');
    const [address, setAddress] = useState('');

    return (
        <div className={styles.container}>
            <PageHeader title="Proceso de Pago" backHref="/checkout/identification" />
            <CheckoutStep currentStep={1} stepTitles={['Identificación', 'Envío', 'Método de pago']} />
            <form className={styles.formContainer}>
                <FormControl component="fieldset" className={styles.radioContainer}>
                    <RadioGroup value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                        <Box className={styles.radio}>
                            <FormControlLabel
                                value="domicilio"
                                control={<Radio />}
                                label="Envío a domicilio"
                            />
                            <LocalShippingIcon />
                        </Box>
                    </RadioGroup>
                </FormControl>
                <div className={styles.deliveryDetails}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-label" sx={{ left: "-12px" }}>Departamento</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Departamento"
                            variant="standard"
                        >
                            <MenuItem value="departamento1">Departamento 1</MenuItem>
                            <MenuItem value="departamento2">Departamento 2</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-label" sx={{ left: "-12px" }}>Provincia</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Provincia"
                            variant="standard"
                        >
                            <MenuItem value="provincia1">Provincia 1</MenuItem>
                            <MenuItem value="provincia2">Provincia 2</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-label" sx={{ left: "-12px" }}>Distrito</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Distrito"
                            variant="standard"
                        >
                            <MenuItem value="distrito1">Distrito 1</MenuItem>
                            <MenuItem value="distrito2">Distrito 2</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Dirección"
                        variant="standard"
                        margin="normal"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Referencia"
                        variant="standard"
                        margin="normal"
                        multiline
                        rows={3}
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                    />
                </div>
            </form>
            <Alert severity="warning">
                <AlertTitle>Entrega estimada</AlertTitle>
                En hasta 3 días hábiles.
            </Alert>
            <div className={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                        NProgress.start();
                        router.push("/checkout/payment")
                    }}
                >
                    SIGUIENTE
                </Button>
            </div>
        </div>
    );
}

export default CheckoutDeliveryView;