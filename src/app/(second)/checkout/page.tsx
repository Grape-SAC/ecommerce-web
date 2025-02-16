"use client";

import ShippingStep from '@/features/checkout/presentation/ShippingStep';
import styles from './Chechout.module.css';
import { useState } from 'react';
import PaymentStep from '@/features/checkout/presentation/PaymentStep';
import IdentificationStep from '@/features/checkout/presentation/IdentificationStep';

const CheckoutPage = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleBack = () => {
        if (step === 1) {
            window.history.back();
        } else {
            prevStep();
        }
    };

    return (
        <div className={styles.checkoutContainer}>
            <h1 className={styles.title}>Proceso de Compra</h1>

            <div className={styles.stepsIndicator}>
                <span className={step >= 1 ? styles.active : ""}>1</span>
                <span className={step >= 2 ? styles.active : ""}>2</span>
                <span className={step >= 3 ? styles.active : ""}>3</span>
            </div>

            {step === 1 && <IdentificationStep />}
            {step === 2 && <ShippingStep onNext={nextStep} onBack={prevStep} />}
            {step === 3 && <PaymentStep onBack={prevStep} />}

            <div className={styles.buttons}>
                <button onClick={handleBack}>Volver</button>
                {step < 3 && <button className={`btn btnPrimary`} onClick={nextStep}>Continuar</button>}
                {step == 3 && <button>Pagar</button>}
            </div>
        </div>
    );
};

export default CheckoutPage;
