import React from 'react';
import {
    CubeIcon,
    TruckIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

import styles from "./mis-pedidos.module.css";
import { PedidoListaDto } from '../types/pedido-lista.dto';
import { EstadoPedidoEnum } from '../enum/estado-pedido.enum';
import LoadingLink from '@/components/ui/loading-link/loading-link';
import EstadoVacioPedidos from '../components/estado-vacio-pedidos';

const getEstadoConfig = (estadoCodigo: EstadoPedidoEnum, estadoDescripcion: string) => {
    switch (estadoCodigo) {
        case EstadoPedidoEnum.VERIFICANDO:
            return { Icon: MagnifyingGlassIcon, text: estadoDescripcion, colorClass: styles.statusYellow };
        case EstadoPedidoEnum.PENDIENTE:
            return { Icon: ClockIcon, text: 'Pendiente de pago', colorClass: styles.statusYellow };
        case EstadoPedidoEnum.PROCESANDO:
            return { Icon: CubeIcon, text: 'Preparando pedido', colorClass: styles.statusBlue };
        case EstadoPedidoEnum.ENVIADO:
            return { Icon: TruckIcon, text: 'En camino', colorClass: styles.statusIndigo };
        case EstadoPedidoEnum.ENTREGADO:
            return { Icon: CheckCircleIcon, text: 'Entregado', colorClass: styles.statusGreen };
        case EstadoPedidoEnum.CANCELADO:
            return { Icon: XCircleIcon, text: 'Cancelado', colorClass: styles.statusRed };
        default:
            return { Icon: ClockIcon, text: estadoCodigo, colorClass: styles.statusGray };
    }
};

const formatearMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(monto);
}

export default function MisPedidosView({ pedidos }: { pedidos: PedidoListaDto[] }) {

    return (
        <section className={styles.container}>
            <div className={styles.contentArea}>
                {pedidos.length === 0 ? (
                    <EstadoVacioPedidos />
                ) : (
                    <ul className={styles.pedidosList}>
                        {pedidos.map((pedido) => {
                            const { Icon, text, colorClass } = getEstadoConfig(pedido.estadoCodigo as EstadoPedidoEnum, pedido.estadoDescripcion);

                            return (
                                <li key={pedido.id}>
                                    <LoadingLink href={`/mis-pedidos/${pedido.id}`} className={styles.orderCard}>

                                        {/* Cabecera: ID y Fecha */}
                                        <div className={styles.cardHeader}>
                                            <span className={styles.orderNumber}>#{pedido.codigo}</span>
                                            <span className={styles.orderDate}>{pedido.fechaCompra}</span>
                                        </div>

                                        {/* Estado con Icono */}
                                        <div className={`${styles.statusRow} ${colorClass}`}>
                                            {/* Renderizamos el componente Heroicon */}
                                            <Icon className={styles.statusIcon} />
                                            <span>{text}</span>
                                        </div>

                                        {/* Pie: Items, Precio y Flecha */}
                                        <div className={styles.cardFooter}>
                                            <span className={styles.itemCount}>
                                                {pedido.cantidadProductos} {pedido.cantidadProductos === 1 ? 'producto' : 'productos'}
                                            </span>
                                            <div className={styles.priceRow}>
                                                <span className={styles.totalPrice}>{formatearMoneda(pedido.montoTotal)}</span>
                                                <ChevronRightIcon className={styles.chevronIcon} />
                                            </div>
                                        </div>
                                    </LoadingLink>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}