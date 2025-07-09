'use client';

import CheckoutStep from '@/components/ui/checkout-step/checkout-step';
import styles from './checkout-delivery.module.css';
import { useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PageHeader from '@/components/ui/page-header/page-header';
import { UserAddressListType } from '@/app/(no-ui)/account/address/types/user-address-list.type';
import UserAddressCreateForm from '@/components/forms/user-address-create-form/user-address-create-form';
import UserAddressUpdateForm from '@/components/forms/user-address-update-form/user-address-update-form';

const CheckoutDeliveryView = ({ userAddresses }: { userAddresses: UserAddressListType[] }) => {
    const [deliveryMethod, setDeliveryMethod] = useState('domicilio');

    return (
        <div className={styles.container}>
            <PageHeader title="Proceso de Pago" backHref="/checkout/identification" />

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

            {userAddresses.length > 0 ? (
                <UserAddressUpdateForm userAddress={userAddresses[0]}/>
            ) : (
                <UserAddressCreateForm />
            )}
        </div>
    );
}

export default CheckoutDeliveryView;