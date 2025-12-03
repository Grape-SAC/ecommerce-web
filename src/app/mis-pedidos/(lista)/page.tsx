import { listarPedidos } from "./services/listar-pedidos.service";
import { MisPedidosErrorView } from "./view/mis-pedidos-error.view";
import MisPedidosView from "./view/mis-pedidos.view";

export default async function MisPedidosPage() {
  try {
    const pedidos = await listarPedidos();
    return <MisPedidosView pedidos={pedidos} />;
  } catch (error: any) {
    return <MisPedidosErrorView error={error} />;
  }
}