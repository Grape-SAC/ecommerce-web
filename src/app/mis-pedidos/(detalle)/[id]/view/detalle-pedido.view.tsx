'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './detalle-pedido.module.css';

import {
  CubeIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronRightIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { EstadoPedidoEnum } from '@/app/mis-pedidos/(lista)/enum/estado-pedido.enum';
import { DetallePedidoType } from '../types/detalle-pedido.type';

const formatearFecha = (iso: string) =>
  new Date(iso).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const formatearMoneda = (monto: number) =>
  new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(monto);

const getEstadoConfig = (estado: EstadoPedidoEnum, descripcion: string) => {
  switch (estado) {
    case EstadoPedidoEnum.VERIFICANDO:
      return {
        Icon: MagnifyingGlassIcon,
        label: descripcion,
        badgeClass: styles.statusYellow,
      };
    case EstadoPedidoEnum.PENDIENTE:
      return {
        Icon: ClockIcon,
        label: 'Pendiente de pago',
        badgeClass: styles.statusYellow,
      };
    case EstadoPedidoEnum.PROCESANDO:
      return {
        Icon: CubeIcon,
        label: 'Preparando pedido',
        badgeClass: styles.statusBlue,
      };
    case EstadoPedidoEnum.ENVIADO:
      return {
        Icon: TruckIcon,
        label: 'En camino',
        badgeClass: styles.statusIndigo,
      };
    case EstadoPedidoEnum.ENTREGADO:
      return {
        Icon: CheckCircleIcon,
        label: 'Entregado',
        badgeClass: styles.statusGreen,
      };
    case EstadoPedidoEnum.CANCELADO:
      return {
        Icon: XCircleIcon,
        label: 'Cancelado',
        badgeClass: styles.statusRed,
      };
    default:
      return {
        Icon: ClockIcon,
        label: descripcion,
        badgeClass: styles.statusGray,
      };
  }
};

export default function DetallePedidoView({ pedido }: { pedido: DetallePedidoType }) {
  const [showComprobante, setShowComprobante] = useState(false);
  const estadoConfig = getEstadoConfig(
    pedido.informacionPedido.codigoEstadoPedido as EstadoPedidoEnum,
    pedido.informacionPedido.nombreEstadoPedido,
  );

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {/* Resumen de pedido */}
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.orderCode}>Pedido #{pedido.informacionPedido.codigoPedido}</p>
              <p className={styles.orderDate}>
                Realizado el {formatearFecha(pedido.informacionPedido.fechaCompra)}
              </p>
            </div>
            <div className={styles.orderTotal}>
              <span>Total</span>
              <strong>{formatearMoneda(pedido.informacionPedido.montoTotal)}</strong>
            </div>
          </div>

          <div className={`${styles.statusBadge} ${estadoConfig.badgeClass}`}>
            <estadoConfig.Icon className={styles.statusIcon} />
            <span>{estadoConfig.label}</span>
          </div>

          {pedido.informacionPedido.infoEstadoPedido && (
            <p className={styles.smallNote}>{pedido.informacionPedido.infoEstadoPedido}</p>
          )}
        </article>

        {/* Información de entrega */}
        <article className={styles.card}>
          <header className={styles.sectionHeader}>
            <MapPinIcon className={styles.sectionIcon} />
            <div>
              <h2 className={styles.sectionTitle}>Información de entrega</h2>
              <p className={styles.sectionSubtitle}>
                {pedido.informacionEntrega.nombreTipoEntrega}
              </p>
            </div>
          </header>

          <div className={styles.deliveryInfo}>
            <div className={styles.deliveryRow}>
              <div>
                <p className={styles.deliveryLabel}>Destinatario</p>
                <p className={styles.deliveryValue}>
                  {pedido.informacionEntrega.destinatario}
                </p>
              </div>
            </div>

            <div className={styles.deliveryRow}>
              <div>
                <p className={styles.deliveryLabel}>Celular de contacto</p>
                <p className={styles.deliveryValue}>
                  {pedido.informacionEntrega.celular}
                </p>
              </div>
            </div>

            <div className={styles.deliveryRow}>
              <div>
                <p className={styles.deliveryLabel}>Dirección</p>
                <p className={styles.deliveryValue}>
                  {pedido.informacionEntrega.direccion}
                </p>
                <p className={styles.deliveryValueSecondary}>
                  {pedido.informacionEntrega.ubigeo}
                </p>
              </div>
            </div>

            <div className={styles.deliveryRow}>
              <div>
                <p className={styles.deliveryLabel}>Referencia</p>
                <p className={styles.deliveryValue}>
                  {pedido.informacionEntrega.referencia}
                </p>
              </div>
            </div>

            {pedido.informacionEntrega.entregaEstimada && (
              <div className={styles.deliveryRow}>
                <div>
                  <p className={styles.deliveryLabel}>Entrega estimada</p>
                  <p className={styles.deliveryEta}>
                    {pedido.informacionEntrega.entregaEstimada}
                  </p>
                </div>
              </div>


            )}
          </div>
        </article>

        {/* Información de pago */}
        <article className={styles.card}>
          <header className={styles.sectionHeader}>
            <CreditCardIcon className={styles.sectionIcon} />
            <div>
              <h2 className={styles.sectionTitle}>Pago</h2>
              <p className={styles.sectionSubtitle}>
                {pedido.informacionPago.nombreMetodoPago}
              </p>
            </div>
          </header>

          <div className={styles.paymentInfo}>
            <div className={styles.paymentRow}>
              <div className={styles.paymentAmountRow}>
                <span>Monto pagado</span>
                <strong>{formatearMoneda(pedido.informacionPago.montoPagado)}</strong>
              </div>
            </div>

            {pedido.informacionPago.urlComprobante && (
              <button
                type="button"
                className={styles.comprobanteButton}
                onClick={() => setShowComprobante(true)}
              >
                <EyeIcon className={styles.comprobanteIcon} />
                <span>Ver comprobante de pago</span>
                <ChevronRightIcon className={styles.comprobanteChevron} />
              </button>
            )}
          </div>
        </article>

        {/* Productos */}
        <article className={styles.card}>
          <header className={styles.sectionHeader}>
            <CubeIcon className={styles.sectionIcon} />
            <div>
              <h2 className={styles.sectionTitle}>Productos del pedido</h2>
              <p className={styles.sectionSubtitle}>
                {pedido.productos.length}{' '}
                {pedido.productos.length === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </header>

          <ul className={styles.productList}>
            {pedido.productos.map((producto) => (
              <li key={producto.id} className={styles.productItem}>
                <div className={styles.productImageWrapper}>
                  {/* Puedes reemplazar <img> por <Image> si quieres */}
                  <img
                    src={producto.urlImagenProducto}
                    alt={producto.nombre}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{producto.nombre}</p>
                  <p className={styles.productMeta}>
                    {producto.cantidad} x{' '}
                    {formatearMoneda(producto.precio)}
                  </p>
                  <p className={styles.productSubtotal}>
                    {formatearMoneda(producto.subTotal)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        {/* Resumen de montos */}
        <article className={styles.card}>
          <h2 className={styles.sectionTitle}>Resumen de pago</h2>

          <div className={styles.summaryRow}>
            <span>Productos</span>
            <span>{formatearMoneda(pedido.resumenPago.montoTotalProductos)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Costo de envío</span>
            <span>{formatearMoneda(pedido.resumenPago.costoEnvio)}</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryRowTotal}>
            <span>Total del pedido</span>
            <span>{formatearMoneda(pedido.resumenPago.montoTotal)}</span>
          </div>
          <p className={styles.igvNote}>* El total incluye IGV (18%).</p>
        </article>

        {/* Ayuda / Soporte */}
        <div className={styles.helpBox}>
          <p className={styles.helpTitle}>¿Necesitas ayuda con tu pedido?</p>
          <p className={styles.helpText}>
            Si tienes dudas sobre el estado de tu pedido o tu pago, puedes
            escribirnos por WhatsApp.
          </p>
          <Link href="https://wa.me/51999999999" className={styles.helpButton}>
            <span>Chatear por WhatsApp</span>
            <ChevronRightIcon className={styles.helpIcon} />
          </Link>
        </div>
      </div>

      {/* Overlay para comprobante */}
      {showComprobante && pedido.informacionPago.urlComprobante && (
        <div
          className={styles.comprobanteOverlay}
          onClick={() => setShowComprobante(false)}
        >
          <div
            className={styles.comprobanteDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={pedido.informacionPago.urlComprobante}
              alt="Comprobante de pago"
              className={styles.comprobanteImage}
            />
          </div>
        </div>
      )}
    </section>
  );
}
