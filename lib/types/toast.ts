// lib/types/toast.ts
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    title?: string;
    message: string;
    type: ToastType;
    duration?: number;
}

export interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}
