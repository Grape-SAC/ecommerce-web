'use client';

import styles from './checkout-identification.module.css';
import CheckoutStep from '@/components/ui/checkout-step/checkout-step';
import PageHeader from '@/components/ui/page-header/page-header';
import { AuthUserResponseType } from '@/app/(no-ui)/auth/register/types/auth-user-response.type';
import UserProfileUpdateForm from '@/components/forms/user-profile-form/user-profile-form';
import UserRegisterForm from '@/components/forms/user-register-form/user-register-form';

const CheckoutIdentificationView = ({ authUser }: { authUser: AuthUserResponseType | null }) => {
    return (
        <div className={styles.container}>
            <PageHeader title="Proceso de Pago" backHref="/cart" />

            <CheckoutStep currentStep={0} stepTitles={['Identificación', 'Envío', 'Método de pago']} />

            {authUser ? (
                <UserProfileUpdateForm authUser={authUser} />
            ) : (
                <UserRegisterForm />
            )}
        </div>
    );
}

export default CheckoutIdentificationView;