import { listarPedidos } from "./services/listar-pedidos.service";
import MisPedidosView from "./view/mis-pedidos.view";

export default async function MisPedidosPage() {
  const pedidos = await listarPedidos();
  return <MisPedidosView pedidos={pedidos} />;
}