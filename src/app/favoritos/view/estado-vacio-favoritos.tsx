import Image from "next/image";
import styles from "./estado-vacio-favoritos.module.css";
import Link from "next/link";
import { Button } from "@mui/material";

export default function EstadoVacioFavoritos() {
    return (
        <div className={styles.emptyState}>
            <div className={styles.imgWrapper}>
                <Image
                    src="/images/favoritos-vacio.svg"
                    alt="Sin favoritos aún"
                    fill
                    className={styles.emptyIllustration}
                />
            </div>

            <h2 className={styles.emptyTitle}>No tienes favoritos aún</h2>

            <p className={styles.emptyText}>
                Guarda tus productos favoritos tocando el ❤️
                para encontrarlos fácilmente después.
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
