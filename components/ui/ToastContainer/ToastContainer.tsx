// components/ui/ToastContainer/ToastContainer.tsx
'use client';

import { useToast } from '../ToastProvider/ToastProvider';
import { Toast } from '../Toast/Toast';
import styles from './ToastContainer.module.scss';

export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) {
        return null;
    }

    return (
        <div className={styles.container} aria-live="polite" aria-atomic="true">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onClose={removeToast}
                />
            ))}
        </div>
    );
}
