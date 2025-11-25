import RegistrarUsuarioForm from "@/components/forms/registrar-usuario-form/registrar-usuario-form";
import style from "./crear-cuenta.module.css";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const CrearCuentaView = () => {

    return (
        <div className={style.container}>
            <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 1 }}>
                    CREAR CUENTA
                </Typography>
            </Box>
            <RegistrarUsuarioForm />
        </div>
    );
};

export default CrearCuentaView;