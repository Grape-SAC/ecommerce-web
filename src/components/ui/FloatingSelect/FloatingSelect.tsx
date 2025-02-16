import styles from './FloatingSelect.module.css';
import { useState } from "react";

interface FloatingSelectProps {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({ id, label, icon }) => {
    const [inputState, setInputState] = useState<"active" | "filled" | "">("");

    const handleFocus = () => setInputState("active");
    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
        setInputState(e.target.value.trim() !== "" ? "filled" : "");
    };

    return (
        <div className={styles.formFloatingGroup}>
            {icon && <span className={`${styles.formIcon} ${styles[inputState]}`}>{icon}</span>}
            <select className={styles.formControl} id={id} defaultValue=""
                        onFocus={handleFocus}
                        onBlur={handleBlur}>
                        <option value="" disabled hidden>Seleccionar</option>
                        <option value="dni">DNI</option>
                        <option value="ruc">RUC</option>
                    </select>
            <label className={`${icon != null ? styles.formLabelIcon : styles.formLabel} ${styles[inputState]}`} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default FloatingSelect;
