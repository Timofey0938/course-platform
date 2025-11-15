// components/ui/Toast/Toast.tsx
'use client';

import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '@/lib/types/toast';
import styles from './Toast.module.scss';

interface ToastProps {
    toast: ToastType;
    onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle className={styles.icon} size={20} />;
            case 'error':
                return <XCircle className={styles.icon} size={20} />;
            case 'warning':
                return <AlertCircle className={styles.icon} size={20} />;
            case 'info':
            default:
                return <Info className={styles.icon} size={20} />;
        }
    };

    const handleClose = () => {
        onClose(toast.id);
    };

    return (
        <div 
            className={`${styles.toast} ${styles[toast.type]}`}
            role="alert"
            aria-live="polite"
        >
            <div className={styles.content}>
                {getIcon()}
                
                <div className={styles.text}>
                    {toast.title && (
                        <h4 className={styles.title}>{toast.title}</h4>
                    )}
                    <p className={styles.message}>{toast.message}</p>
                </div>
            </div>
            
            <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Закрыть уведомление"
            >
                <X size={16} />
            </button>
        </div>
    );
}
