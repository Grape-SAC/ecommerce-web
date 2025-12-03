import Image from "next/image";
import { Button } from "@mui/material";
import styles from "./confirmacion-compra.module.css";
import LoadingLink from "@/components/ui/loading-link/loading-link";

const ConfirmacionCompraView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>

                <Image
                    src="/images/compra-registrada.svg"
                    alt="Compra registrada"
                    width={340}
                    height={340}
                    className={styles.illustration}
                />

                <h2 className={styles.title}>¡Compra registrada con éxito!</h2>

                <p className={styles.text}>
                    Gracias por tu compra. Estamos procesando tu pedido y te
                    notificaremos cuando esté listo para envío.
                </p>

                <div className={styles.actions}>

                    {/* 🔵 Botón principal con LoadingLink */}
                    <LoadingLink href="/" className="">
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            component="div"   /* evita problemas con <a> dentro */
                        >
                            Ir al inicio
                        </Button>
                    </LoadingLink>

                    {/* 🔵 Segundo botón con LoadingLink */}
                    <LoadingLink href="/mis-pedidos" className="">
                        <Button
                            variant="outlined"
                            size="large"
                            fullWidth
                            component="div"
                        >
                            Ver mis pedidos
                        </Button>
                    </LoadingLink>

                </div>

            </div>
        </div>
    );
};

export default ConfirmacionCompraView;
