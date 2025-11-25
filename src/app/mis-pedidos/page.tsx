import { listarPedidos } from "./services/listar-pedidos.service";
import { PedidoListaDto } from "./types/pedido-lista.dto";
import MisPedidosView from "./view/mis-pedidos.view";

export default async function MisPedidosPage() {
  const pedidos: PedidoListaDto[] = await listarPedidos();
  console.log("mi lista de pedidos", pedidos);
  return (<MisPedidosView pedidos={pedidos} />);
}