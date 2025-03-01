'use client';

import styles from './FloatingInput.module.css';
import { useState } from "react";

interface FloatingInputProps {
    id: string;
    label: string;
    icon?: React.ReactNode;
    type?: "text" | "email" | "tel" | "number" | "textarea";
}

const FloatingInput: React.FC<FloatingInputProps> = ({ id, label, icon, type = "text" }) => {
    const [inputState, setInputState] = useState<"active" | "filled" | "">("");

    const handleFocus = () => setInputState("active");

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputState(e.target.value.trim() !== "" ? "filled" : "");
    };

    return (
        <div className={styles.formFloatingGroup}>
            {icon && <span className={`${styles.formIcon} ${styles[inputState]}`}>{icon}</span>}
            {type === "textarea" ? (
                <textarea
                    className={`${styles.formControl} ${styles.textarea}`}
                    id={id}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            ) : (
                <input
                    type={type}
                    className={styles.formControl}
                    id={id}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            )}

            <label className={`${icon != null ? styles.formLabelIcon : styles.formLabel} ${styles[inputState]}`} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default FloatingInput;
