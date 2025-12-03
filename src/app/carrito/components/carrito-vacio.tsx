import Image from "next/image";
import styles from "./carrito-vacio.module.css";
import Link from "next/link";
import { Button } from "@mui/material";

export default function CarritoVacio() {
    return (
        <div className={styles.emptyContainer}>
            <Image
                src="/images/carrito-vacio.svg"
                alt="Carrito vacío"
                width={260}
                height={260}
                className={styles.illustration}
            />

            <h2 className={styles.title}>Tu carrito está vacío</h2>

            <p className={styles.text}>
                Aún no has agregado productos. ¡Explora nuestro catálogo!
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
