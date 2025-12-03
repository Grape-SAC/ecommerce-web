import Stepper from '@/components/ui/stepper/stepper';
import styles from './pago-compra.module.css';
import { Box, Button, Dialog, DialogContent, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Image from 'next/image';
import InfoModal from '@/components/ui/info-modal/info-modal';
import { ArticuloCarritoType } from '@/app/carrito/types/articulo-carrito.type';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';
import { useState } from 'react';

type Props = {
    articulosCarrito: ArticuloCarritoType[];
    precioEnvio: number;
    subtotal: number;
    total: number;
    loading: boolean;
    backendError: string | null;
    clientError: string | null;
    metodoPago: string,
    onMetodoPagoChange: (value: string) => void;
    archivoComprobante: File | null;
    onArchivoComprobanteChange: (file: File | null) => void;
    onFinishOrder: (archivo: File | null, metodoPago: string) => Promise<void>;
    dialogOpen: boolean;
    onCloseDialog: () => void;
    previewUrl: string | null;
};

const PagoCompraView = ({
    articulosCarrito,
    precioEnvio,
    subtotal,
    total,
    loading,
    backendError,
    clientError,
    metodoPago,
    onMetodoPagoChange,
    archivoComprobante,
    onArchivoComprobanteChange,
    onFinishOrder,
    dialogOpen,
    onCloseDialog,
    previewUrl
}: Props) => {
    const [openImageDialog, setOpenImageDialog] = useState(false);

    return (
        <div className={styles.container} style={{ paddingBottom: '90px' }}>
            {loading && <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />}
            
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
                            onArchivoComprobanteChange(null);
                        }

                        onMetodoPagoChange(selectedMethod);
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
                                onArchivoComprobanteChange(file);
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
                            {previewUrl && (
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <img
                                        src={previewUrl}
                                        alt="Vista previa"
                                        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                                        onClick={() => setOpenImageDialog(true)}
                                    />
                                </Box>
                            )}
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
                        <strong>S/ {total.toFixed(2)}</strong>
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
                    onClick={() => onFinishOrder(archivoComprobante, metodoPago)}
                >
                    FINALIZAR MI COMPRA
                </Button>
            </div>

            <InfoModal
                open={dialogOpen}
                onClose={onCloseDialog}
                title="Estimado cliente"
                message={clientError || backendError}
            />

            <Dialog
                open={openImageDialog}
                onClose={() => setOpenImageDialog(false)}
                fullWidth
                maxWidth="md"
                slotProps={{
                    paper: {
                        sx: {
                            background: "transparent", // sin fondo
                            boxShadow: "none",         // sin sombra
                        }
                    }
                }}
            >
                <DialogContent sx={{ p: 0, background: "transparent" }}>
                    <img
                        src={previewUrl || undefined}
                        alt="Comprobante grande"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 8
                        }}
                    />
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default PagoCompraView;