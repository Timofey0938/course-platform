// components/ui/Input/Input.tsx
import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

export interface BaseInputProps {
    label?: string;
    error?: string;
    icon?: LucideIcon;
    helperText?: string;
}

export interface InputProps extends BaseInputProps, InputHTMLAttributes<HTMLInputElement> {
    as?: 'input';
}

export interface TextareaProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
    as: 'textarea';
}

type Props = InputProps | TextareaProps;

export const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, Props>(
    ({ 
        label, 
        error, 
        icon: Icon,
        helperText,
        as = 'input',
        className = '',
        onChange,
        onBlur,
        value,
        ...props 
    }, ref) => {
        const inputClassName = [
            styles.input,
            error && styles.error,
            Icon && styles.withIcon,
            as === 'textarea' && styles.textarea,
            className
        ].filter(Boolean).join(' ');

        const commonProps = {
            ref,
            className: inputClassName,
            value,
            onChange,
            onBlur,
            ...props
        };

        return (
            <div className={styles.container}>
                {label && (
                    <label className={styles.label}>
                        {label}
                    </label>
                )}
                
                <div className={styles.inputWrapper}>
                    {Icon && (
                        <Icon className={styles.icon} size={16} />
                    )}
                    
                    {as === 'textarea' ? (
                        <textarea {...commonProps} />
                    ) : (
                        <input {...commonProps} />
                    )}
                </div>
                
                {(error || helperText) && (
                    <div className={styles.footer}>
                        {error && (
                            <span className={styles.errorText}>{error}</span>
                        )}
                        {helperText && !error && (
                            <span className={styles.helperText}>{helperText}</span>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
