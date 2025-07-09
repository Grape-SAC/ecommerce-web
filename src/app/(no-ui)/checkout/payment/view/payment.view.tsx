'use client';

import CheckoutStep from '@/components/ui/checkout-step/checkout-step';
import styles from './payment.module.css';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useRouter } from 'next/navigation';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import NProgress from 'nprogress';
import { CartItemType } from '@/app/(no-ui)/cart/types/cart-item.type';
import PageHeader from '@/components/ui/page-header/page-header';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const PaymentView = ({ cartItems }: { cartItems: CartItemType[] }) => {
    const router = useRouter();
    const [payMethod, setDeliveryMethod] = useState('yape');
    const shippingPrice: number = useSelector((state: RootState) => state.checkout.shippingPrice);
    const userAddressId: string | null = useSelector((state: RootState) => state.checkout.userAddressId);

    const subtotal = useMemo(() => {
        return cartItems.reduce((acumulado, item) => acumulado + item.price * item.quantity, 0);
    }, [cartItems]);

    const calculateTotal = useMemo(() => {
        return subtotal + Number(shippingPrice || 0);
    }, [subtotal, shippingPrice]);

    return (
        <div className={styles.container}>
            <PageHeader title="Proceso de Pago" backHref="/checkout/delivery" />

            <CheckoutStep currentStep={2} stepTitles={['Identificación', 'Envío', 'Método de pago']} />

            <FormControl component="fieldset" className={styles.radioContainer}>
                <RadioGroup value={payMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                    <Box className={styles.radio}>
                        <FormControlLabel
                            value="yape"
                            control={<Radio />}
                            label="Yape / Plin"
                        />
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <Image src="/yape.png" alt="Yape Logo" width={22} height={22} />
                            <Image src="/plin.png" alt="Yape Logo" width={22} height={22} />
                        </Box>
                    </Box>
                    <Box className={styles.radio}>
                        <FormControlLabel
                            value="transferencia"
                            control={<Radio />}
                            label="Transferencia"
                        />
                        <AccountBalanceIcon />
                    </Box>
                    <Box className={styles.radio}>
                        <FormControlLabel
                            value="contraEntrega"
                            control={<Radio />}
                            label="Contra entrega"
                        />
                        <LocalAtmIcon color='success' />
                    </Box>
                </RadioGroup>
            </FormControl>
            <div className={styles.summaryContainer}>
                <h2>RESUMEN DE COMPRA</h2>
                {cartItems.map((item, index) => (
                    <div key={index} className={styles.summaryItem}>
                        <span>{item.name} x {item.quantity}</span>
                        <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className={styles.summaryDetails}>
                    <div className={styles.summaryRow}>
                        <span>Sub Total:</span>
                        <span>S/ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Costo de Envío:</span>
                        <span>S/ {Number(shippingPrice || 0).toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryTotal}>
                        <strong>Total:</strong>
                        <strong>S/ {calculateTotal.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
            <div className={styles.igvNote}>
                * El total incluye IGV (18%)
            </div>
            <h4>user address id: {userAddressId}</h4>
            <div className={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                >
                    FINALIZAR MI COMPRA
                </Button>
            </div>
        </div>
    );
}

export default PaymentView;