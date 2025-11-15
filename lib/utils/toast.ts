// lib/utils/toast.ts
import { useToast } from '@/components/ui';

export function useToasts() {
    const { addToast } = useToast();

    const success = (message: string, title?: string) => {
        addToast({ type: 'success', message, title });
    };

    const error = (message: string, title?: string) => {
        addToast({ type: 'error', message, title });
    };

    const warning = (message: string, title?: string) => {
        addToast({ type: 'warning', message, title });
    };

    const info = (message: string, title?: string) => {
        addToast({ type: 'info', message, title });
    };

    return { success, error, warning, info };
}
