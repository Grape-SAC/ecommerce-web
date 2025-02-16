import styles from './IdentificationStep.module.css';
import { EnvelopeIcon, IdentificationIcon, PhoneIcon, UserIcon } from '@heroicons/react/20/solid';
import FloatingInput from '@/components/ui/FloatingInput/FloatingInput';
import FloatingSelect from '@/components/ui/FloatingSelect/FloatingSelect';

const IdentificationStep = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Mi identificación</h2>
            <form className={styles.formContainer}>
                <FloatingInput id="lblNombres" label="Nombres" icon={<UserIcon />} />
                <div className={styles.formRow}>
                    <FloatingInput id="lblApellidoPaterno" label="Apellido Paterno" />
                    <FloatingInput id="lblApellidoMaterno" label="Apellido Materno" />
                </div>
                <FloatingInput id="lblCorreo" label="Correo electrónico" icon={<EnvelopeIcon />} type='email' />
                <FloatingInput id="lblCelular" label="Número de celular" icon={<PhoneIcon />} type='tel' />
                <FloatingSelect id="lblTipoDocumento" label="Tipo de documento" icon={<IdentificationIcon />} />
                <FloatingInput id="lblDocumento" label="Número de documento" type='number' />
            </form>
        </div>
    );
};

export default IdentificationStep;
