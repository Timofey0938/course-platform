// components/ui/Select/Select.tsx
import { ChevronDown } from 'lucide-react';
import { SelectHTMLAttributes, forwardRef } from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ 
        label, 
        error, 
        helperText,
        options,
        className = '',
        onChange, // Явно вытаскиваем onChange
        value,    // Явно вытаскиваем value
        ...props 
    }, ref) => {
        const selectClassName = [
            styles.select,
            error && styles.error,
            className
        ].filter(Boolean).join(' ');

        return (
            <div className={styles.container}>
                {label && (
                    <label className={styles.label}>
                        {label}
                    </label>
                )}
                
                <div className={styles.selectWrapper}>
                    <select
                        ref={ref}
                        className={selectClassName}
                        value={value}        // Передаем value
                        onChange={onChange}  // Передаем onChange
                        {...props}           // Остальные props
                    >
                        {options.map((option) => (
                            <option 
                                key={option.value} 
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    
                    <ChevronDown className={styles.chevron} size={16} />
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

Select.displayName = 'Select';
