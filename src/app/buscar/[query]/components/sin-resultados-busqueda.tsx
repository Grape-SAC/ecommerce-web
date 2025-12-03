import Image from "next/image";
import styles from "./sin-resultados-busqueda.module.css";

export default function SinResultadosBusqueda() {
    return (
        <div className={styles.emptyContainer}>
            <Image
                src="/images/sin-resultados-busqueda.svg"   // ★ pon aquí tu ilustración descargada
                alt="Sin resultados"
                width={260}
                height={260}
                className={styles.illustration}
            />

            <h2 className={styles.title}>No se encontraron productos</h2>

            <p className={styles.text}>
                Intenta buscar nuevamente con otras palabras.
            </p>
        </div>
    );
}
