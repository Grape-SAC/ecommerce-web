'use client';

import CheckoutStep from '@/components/ui/checkout-step/checkout-step';
import styles from './entrega-compra.module.css';
import { useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PageHeader from '@/components/ui/page-header/page-header';
import CrearDireccionUsuarioForm from '@/components/forms/crear-direccion-usuario-form/crear-direccion-usuario-form';
import ActualizarDireccionUsuarioForm from '@/components/forms/actualizar-direccion-usuario-form/actualizar-direccion-usuario-form';
import { ListaDireccionesUsuarioType } from '@/app/mi-cuenta/direcciones/types/lista-direcciones-usuario.type';

const EntregaCompraView = ({ direccionesUsuario }: { direccionesUsuario: ListaDireccionesUsuarioType[] }) => {
    const [deliveryMethod, setDeliveryMethod] = useState('domicilio');

    return (
        <div className={styles.container}>
            <PageHeader title="Proceso de Pago" backHref="/finalizar-compra/identificacion" />

            <CheckoutStep currentStep={1} stepTitles={['Identificación', 'Envío', 'Método de pago']} />

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

            {direccionesUsuario.length > 0 ? (
                <ActualizarDireccionUsuarioForm direccionUsuario={direccionesUsuario[0]}/>
            ) : (
                <CrearDireccionUsuarioForm />
            )}
        </div>
    );
}

export default EntregaCompraView;