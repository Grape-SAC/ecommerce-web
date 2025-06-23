import styles from './checkout-step.module.css';

type CheckoutStepProps = {
  currentStep: number;
  stepTitles: string[];
};

const CheckoutStep = ({ currentStep, stepTitles }: CheckoutStepProps) => {
  return (
    <div className={styles.stepContainer}>
      {stepTitles.map((title, index) => {
        const isActive = index === currentStep;

        return (
          <div key={index} className={`${styles.stepWrapper} ${index < currentStep ? styles.active : ''}`}>
            <div className={`${styles.stepCircle} ${index <= currentStep ? styles.active : ''}`}>
              {index + 1}
            </div>
            <span className={`${styles.stepTitle} ${isActive ? styles.activeTitle : ''}`}>
              {title}
            </span>
            {index < stepTitles.length - 1 && <div className={styles.stepLine} />}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutStep;
