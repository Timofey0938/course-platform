// components/ui/Button/Button.tsx
import { LucideIcon } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ 
        children, 
        variant = 'primary', 
        size = 'md', 
        loading = false, 
        icon: Icon,
        iconPosition = 'left',
        className = '',
        disabled,
        ...props 
    }, ref) => {
        const buttonClassName = [
            styles.button,
            styles[variant],
            styles[size],
            loading && styles.loading,
            disabled && styles.disabled,
            className
        ].filter(Boolean).join(' ');

        return (
            <button
                ref={ref}
                className={buttonClassName}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <div className={styles.spinner} />
                )}
                
                {Icon && iconPosition === 'left' && !loading && (
                    <Icon className={styles.icon} size={16} />
                )}
                
                {children}
                
                {Icon && iconPosition === 'right' && !loading && (
                    <Icon className={styles.icon} size={16} />
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
