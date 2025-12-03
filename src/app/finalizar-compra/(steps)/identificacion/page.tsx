'use client'

import IdentificacionCompraView from "./view/identificacion-compra.view";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UsuarioAutenticacionType } from "@/shared/types/usuario-autenticacion-response.type";

const IdentificacionCompraPage = () => {
    const usuarioAutenticacion: UsuarioAutenticacionType | null = useSelector((state: RootState) => state.auth.usuario);

    return (
        <IdentificacionCompraView usuarioAutenticacion={usuarioAutenticacion} />
    );
}

export default IdentificacionCompraPage;