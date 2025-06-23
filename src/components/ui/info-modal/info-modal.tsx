'use client';

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

interface InfoModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    message: string | null;
}

const InfoModal: React.FC<InfoModalProps> = ({
    open,
    onClose,
    title = 'Información',
    message,
}) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} autoFocus>
                Cerrar
            </Button>
        </DialogActions>
    </Dialog>
);

export default InfoModal;