'use client';

import styles from './identificacion-compra.module.css';
import ActualizarPerfilForm from '@/components/forms/actualizar-perfil-usuario-form/actualizar-perfil-usuario-form';
import RegistrarUsuarioForm from '@/components/forms/registrar-usuario-form/registrar-usuario-form';
import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';
import { useState } from 'react';

const IdentificacionCompraView = ({ usuarioAutenticacion }: { usuarioAutenticacion: UsuarioAutenticacionType | null }) => {
    const [isRegisteringProcess, setIsRegisteringProcess] = useState(false);

    return (
        <div className={styles.container}>
            {usuarioAutenticacion && !isRegisteringProcess ? (
                <ActualizarPerfilForm usuarioAutenticacion={usuarioAutenticacion} />
            ) : (
                <RegistrarUsuarioForm
                    onStartAsyncOperation={() => setIsRegisteringProcess(true)}
                    redirectPath="/finalizar-compra/entrega"
                    loadingSx={{ position: 'fixed', zIndex: 9999 }}
                />
            )}
        </div>
    );
}

export default IdentificacionCompraView;