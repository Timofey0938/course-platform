// components/ui/Card/Card.tsx
import { HTMLAttributes, forwardRef } from 'react';
import styles from './Card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outlined' | 'elevated';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ 
        children,
        variant = 'default',
        padding = 'md',
        hover = false,
        className = '',
        ...props 
    }, ref) => {
        const cardClassName = [
            styles.card,
            styles[variant],
            styles[`padding-${padding}`],
            hover && styles.hover,
            className
        ].filter(Boolean).join(' ');

        return (
            <div
                ref={ref}
                className={cardClassName}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
