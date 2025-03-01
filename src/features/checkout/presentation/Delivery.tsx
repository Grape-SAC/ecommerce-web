'use client';

import CheckoutStep from '@/components/ui/CheckoutStep/CheckoutStep';
import styles from './Delivery.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';

const Delivery = () => {
    const router = useRouter();
    const [deliveryMethod, setDeliveryMethod] = useState('domicilio');
    const [reference, setReference] = useState('');
    const [address, setAddress] = useState('');

    return (
        <div className={styles.container}>
            <CheckoutStep currentStep={1} />
            <h1 className={styles.title}>ENTREGA DE PRODUCTO</h1>
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

                    <Box className={styles.radio}>
                        <FormControlLabel
                            value="tienda"
                            control={<Radio />}
                            label="Retiro en tienda"
                        />
                        <StoreIcon />
                    </Box>
                </RadioGroup>
            </FormControl>
            {deliveryMethod === 'domicilio' ? (
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
            ) : (
                <div className={styles.storePickupDetails}>
                    <h3>Selecciona una tienda</h3>
                    <select className={styles.inputField}>
                        <option value="store1">Tienda 1 - Centro</option>
                        <option value="store2">Tienda 2 - Norte</option>
                        <option value="store3">Tienda 3 - Sur</option>
                    </select>
                </div>
            )}
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

export default Delivery;