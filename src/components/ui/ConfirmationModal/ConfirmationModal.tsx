"use client";

import React from "react";
import styles from "./ConfirmationModal.module.css";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.modal} ${isOpen ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title ?? "Advertencia"}</h2>
        </div>
        <div className={styles.modalBody}>
          <p>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.cancelButton}>CANCELAR</button>
          <button onClick={onConfirm} className={styles.acceptButton}>ACEPTAR</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
