import { obtenerDetallePedido } from "./services/obtener-detalle.pedido.service";
import { DetallePedidoType } from "./types/detalle-pedido.type";
import DetallePedidoView from "./view/detalle-pedido.view";

export default async function DetallePedidoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pedido: DetallePedidoType = await obtenerDetallePedido(id);

  return <DetallePedidoView pedido={pedido} />;
}
