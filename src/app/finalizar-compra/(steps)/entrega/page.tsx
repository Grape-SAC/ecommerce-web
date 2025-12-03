import { ListaDireccionesUsuarioType } from "@/app/mi-cuenta/direcciones/types/lista-direcciones-usuario.type";
import EntregaCompraView from "./view/entrega-compra.view";
import { listarDireccionesUsuario } from "@/app/mi-cuenta/direcciones/services/listar-direcciones-usuario.service";


const EntregaCompraPage = async () => {
    const direccionesUsuario: ListaDireccionesUsuarioType[] = await listarDireccionesUsuario();

    return (
        <EntregaCompraView direccionesUsuario={direccionesUsuario} />
    );
}

export default EntregaCompraPage;