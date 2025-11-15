// components/ui/ToastProvider/ToastProvider.tsx
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Toast, ToastContextType } from '@/lib/types/toast';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastAction =
    | { type: 'ADD_TOAST'; payload: Toast }
    | { type: 'REMOVE_TOAST'; payload: string }
    | { type: 'CLEAR_TOASTS' };

function toastReducer(state: Toast[], action: ToastAction): Toast[] {
    switch (action.type) {
        case 'ADD_TOAST':
            return [...state, action.payload];
        case 'REMOVE_TOAST':
            return state.filter(toast => toast.id !== action.payload);
        case 'CLEAR_TOASTS':
            return [];
        default:
            return state;
    }
}

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, dispatch] = useReducer(toastReducer, []);

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: Toast = {
            ...toast,
            id,
            duration: toast.duration || 5000,
        };
        
        dispatch({ type: 'ADD_TOAST', payload: newToast });

        // Автоматическое удаление через указанное время
        if (newToast.duration !== Infinity) {
            setTimeout(() => {
                removeToast(id);
            }, newToast.duration);
        }
    };

    const removeToast = (id: string) => {
        dispatch({ type: 'REMOVE_TOAST', payload: id });
    };

    const clearToasts = () => {
        dispatch({ type: 'CLEAR_TOASTS' });
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
