'use client';

import CheckoutStep from '@/components/ui/checkout-step/checkout-step';
import styles from './pago-compra.module.css';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useRouter } from 'next/navigation';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import NProgress from 'nprogress';
import PageHeader from '@/components/ui/page-header/page-header';
import { RegistrarPedidoType } from '../types/registrar-pedido.type';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { useRegistrarPedido } from '../hooks/use-registrar-pedido';
import { useDispatch } from 'react-redux';
import { vaciarCarrito } from '@/store/slices/carrito.slice';
import { ArticuloCarritoType } from '@/app/carrito/types/articulo-carrito.type';

type Props = {
    articulosCarrito: ArticuloCarritoType[];
    precioEnvio: number;
    usuarioDireccionId: string | null;
};

const PagoCompraView = ({ articulosCarrito, precioEnvio, usuarioDireccionId }: Props) => {
    const router = useRouter();
    const [metodoPago, setMetodoPago] = useState('YAPE_PLIN');
    const { execute, loading, error } = useRegistrarPedido();
    const [archivoComprobante, setArchivoComprobante] = useState<File | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();

    const subtotal = useMemo(() => {
        return articulosCarrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
    }, [articulosCarrito]);

    const calculoTotalPagar = useMemo(() => {
        return subtotal + Number(precioEnvio || 0);
    }, [subtotal, precioEnvio]);

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    useEffect(() => {
        let objectUrl: string | null = null;

        if (archivoComprobante) {
            objectUrl = URL.createObjectURL(archivoComprobante);
        }

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [archivoComprobante]);

    const handleCloseDialog = () => setDialogOpen(false);

    const handleFinishOrder = async () => {
        NProgress.start();

        const request: RegistrarPedidoType = {
            usuarioDireccionId: usuarioDireccionId!,
            codigoMetodoPago: metodoPago,
            codigoTipoEntrega: 'DELIVERY',
            productos: articulosCarrito.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad,
                precio: item.precio
            }))
        };

        const success = await execute(request, archivoComprobante ?? undefined);

        if (success) {
            dispatch(vaciarCarrito());
            router.push('/finaliza-compra/confirmacion');
        }

        NProgress.done();
    };

    return (
        <div className={styles.container} style={{ paddingBottom: '90px' }}>
            <PageHeader title="Proceso de Pago" backHref="/finaliza-compra/entrega" />

            <CheckoutStep currentStep={2} stepTitles={['Identificación', 'Envío', 'Método de pago']} />

            <FormControl component="fieldset" className={styles.radioContainer}>
                <RadioGroup
                    value={metodoPago}
                    onChange={(e) => {
                        const selectedMethod = e.target.value;

                        if (
                            (['YAPE_PLIN', 'TRANSFERENCIA'].includes(metodoPago) &&
                                !['YAPE_PLIN', 'TRANSFERENCIA'].includes(selectedMethod))
                            || metodoPago !== selectedMethod
                        ) {
                            setArchivoComprobante(null);
                        }

                        setMetodoPago(selectedMethod);
                    }}
                >
                    <Box className={styles.radio}>
                        <FormControlLabel
                            value="YAPE_PLIN"
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
                            value="TRANSFERENCIA"
                            control={<Radio />}
                            label="Transferencia"
                        />
                        <AccountBalanceIcon />
                    </Box>
                    <Box className={styles.radio}>
                        <FormControlLabel
                            value="CONTRA_ENTREGA"
                            control={<Radio />}
                            label="Contra entrega"
                        />
                        <LocalAtmIcon color='success' />
                    </Box>
                </RadioGroup>
            </FormControl>

            {['YAPE_PLIN', 'TRANSFERENCIA'].includes(metodoPago) && (
                <Box sx={{ mt: 2 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                        Comprobante de pago ({metodoPago === 'YAPE_PLIN' ? 'Yape / Plin' : 'Transferencia'})
                    </label>

                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                    >
                        {archivoComprobante ? "Cambiar archivo" : "Subir comprobante"}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setArchivoComprobante(file);
                            }}
                        />
                    </Button>

                    {archivoComprobante && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                                Archivo seleccionado:
                            </label>
                            <div style={{ marginTop: 4 }}>{archivoComprobante.name}</div>

                            {/* Vista previa opcional */}
                            <Box sx={{ mt: 2 }}>
                                <img
                                    src={URL.createObjectURL(archivoComprobante)}
                                    alt="Vista previa"
                                    style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            )}

            <div className={styles.summaryContainer}>
                <h2>RESUMEN DE COMPRA</h2>
                {articulosCarrito.map((item, index) => (
                    <div key={index} className={styles.summaryItem}>
                        <span>{item.nombre} x {item.cantidad}</span>
                        <span>S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                ))}
                <div className={styles.summaryDetails}>
                    <div className={styles.summaryRow}>
                        <span>Sub Total:</span>
                        <span>S/ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Costo de Envío:</span>
                        <span>S/ {Number(precioEnvio || 0).toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryTotal}>
                        <strong>Total:</strong>
                        <strong>S/ {calculoTotalPagar.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
            <div className={styles.igvNote}>
                * El total incluye IGV (18%)
            </div>
            <div className={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={loading}
                    onClick={handleFinishOrder}
                >
                    FINALIZAR MI COMPRA
                </Button>
            </div>

            <InfoModal
                open={dialogOpen}
                onClose={handleCloseDialog}
                title="Informe de error"
                message={error}
            />
        </div>
    );
}

export default PagoCompraView;