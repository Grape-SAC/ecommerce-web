import { buscarProducto } from "./services/producto-buscar-service";
import { ResumenProductoType } from "./types/resumen-producto.type";
import ListarProductosView from "./view/listar-productos.view";

const BuscarProductoPage = async ({ params }: { params: { query: string } }) => {    
    const productos: ResumenProductoType[] = await buscarProducto(params.query);

    if (productos.length === 0) {
        return <p>No se encontraron productos.</p>;
    }

    return (
        <ListarProductosView productos={productos} />
    );
};

export default BuscarProductoPage;
