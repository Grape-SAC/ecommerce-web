import Link from "next/link";
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import styles from "./estado-vacio-pedidos.module.css";
import Image from "next/image";
import { Button } from "@mui/material";

export default function EstadoVacioPedidos() {
    return (
        <div className={styles.emptyState}>
            <div className={styles.imgWrapper}>
                <Image
                    src="/images/sin-pedidos.svg"
                    alt="Sin pedidos aún"
                    fill
                    className={styles.emptyIllustration}
                />
            </div>

            <h2 className={styles.emptyTitle}>Aún no tienes pedidos</h2>

            <p className={styles.emptyText}>
                Tus compras aparecerán aquí. ¡Explora nuestro catálogo!
            </p>

            <Link href="/" passHref>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    className={styles.actionButton}
                >
                    Ir a comprar
                </Button>
            </Link>
        </div>
    );
}
