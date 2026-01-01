import SinResultadosBusqueda from "./components/sin-resultados-busqueda";
import { buscarProducto } from "./services/buscar-producto.service";
import { ResumenProductoType } from "../../../shared/types/resumen-producto.type";
import ListarProductosView from "./view/listar-productos.view";

type BuscarPageProps = {
    params: Promise<{ query: string }>;
};

const BuscarProductoPage = async (props: BuscarPageProps) => {
    const { query } = await props.params;

    const productos: ResumenProductoType[] = await buscarProducto(query);

    if (productos.length === 0) {
        return <SinResultadosBusqueda />;
    }

    return (
        <div style={{ padding: '16px' }}>
            <ListarProductosView productos={productos} />
        </div>
    );
};

export default BuscarProductoPage;
