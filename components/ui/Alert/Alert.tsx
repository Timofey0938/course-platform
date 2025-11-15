// components/ui/Alert/Alert.tsx
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { HTMLAttributes, forwardRef } from 'react';
import styles from './Alert.module.scss';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
    ({ 
        children,
        variant = 'info',
        title,
        dismissible = false,
        onDismiss,
        className = '',
        ...props 
    }, ref) => {
        const alertClassName = [
            styles.alert,
            styles[variant],
            className
        ].filter(Boolean).join(' ');

        const getIcon = () => {
            switch (variant) {
                case 'success':
                    return <CheckCircle className={styles.icon} size={20} />;
                case 'warning':
                    return <AlertCircle className={styles.icon} size={20} />;
                case 'error':
                    return <XCircle className={styles.icon} size={20} />;
                case 'info':
                default:
                    return <Info className={styles.icon} size={20} />;
            }
        };

        return (
            <div
                ref={ref}
                className={alertClassName}
                role="alert"
                {...props}
            >
                <div className={styles.content}>
                    {getIcon()}
                    
                    <div className={styles.text}>
                        {title && (
                            <h4 className={styles.title}>{title}</h4>
                        )}
                        <div className={styles.message}>{children}</div>
                    </div>
                </div>
                
                {dismissible && (
                    <button
                        className={styles.dismissButton}
                        onClick={onDismiss}
                        aria-label="Закрыть уведомление"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        );
    }
);

Alert.displayName = 'Alert';
