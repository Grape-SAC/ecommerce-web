import styles from './CheckoutStep.module.css';

const CheckoutStep = ({ currentStep }: { currentStep: number }) => {
    return (
        <div className={styles.stepContainer}>
            {[...Array(3)].map((_, index) => (
                <div key={index} className={`${styles.stepWrapper} ${index < currentStep ? styles.active : ''}`}>
                    <div className={`${styles.stepCircle} ${index <= currentStep ? styles.active : ''}`}>
                        {index + 1}
                    </div>
                    {index < 2 && <div className={styles.stepLine} />} {/* Solo agrega línea hasta el segundo paso */}
                </div>
            ))}
        </div>
    );
};

export default CheckoutStep;
