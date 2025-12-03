'use client';

export default function ErrorMisPedidos({ error }: any) {

    console.error("Error en MisPedidos:", error);

    return (
        <p style={{ padding: 20 }}>
            Ocurrió un error al cargar pedidos...
        </p>
    );
}
