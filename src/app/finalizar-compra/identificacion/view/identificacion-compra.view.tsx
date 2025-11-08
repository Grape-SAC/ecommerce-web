'use client';

import styles from './identificacion-compra.module.css';
import CheckoutStep from '@/components/ui/checkout-step/checkout-step';
import PageHeader from '@/components/ui/page-header/page-header';
import ActualizarPerfilForm from '@/components/forms/usuario-actualizar-perfil-form/usuario-actualizar-perfil-form';
import RegistroUsuarioForm from '@/components/forms/usuario-registrar-form/usuario-registrar-form';
import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';

const IdentificacionCompraView = ({ usuarioAutenticacion }: { usuarioAutenticacion: UsuarioAutenticacionType | null }) => {
    return (
        <div className={styles.container}>
            <PageHeader title="Proceso de Pago" backHref="/carrito" />

            <CheckoutStep currentStep={0} stepTitles={['Identificación', 'Envío', 'Método de pago']} />

            {usuarioAutenticacion ? (
                <ActualizarPerfilForm usuarioAutenticacion={usuarioAutenticacion} />
            ) : (
                <RegistroUsuarioForm />
            )}
        </div>
    );
}

export default IdentificacionCompraView;