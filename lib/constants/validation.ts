// lib/constants/validation.ts

// Сообщения валидации для форм
export const VALIDATION_MESSAGES = {
    REQUIRED: 'Поле обязательно для заполнения',
    INVALID_EMAIL: 'Введите корректный email адрес',
    INVALID_URL: 'Введите корректный URL',
    INVALID_SLUG: 'Может содержать только латинские буквы, цифры и дефисы',
    
    // Длины полей
    TOO_LONG: (field: string, max: number) => 
        `Слишком длинный ${field}. Максимум ${max} символов`,
    TOO_SHORT: (field: string, min: number) => 
        `Слишком короткий ${field}. Минимум ${min} символов`,
    
    // Специфичные для полей
    TITLE_REQUIRED: 'Название курса обязательно',
    SLUG_REQUIRED: 'URL-адрес обязателен',
    SLUG_UNIQUE: 'Курс с таким URL-адресом уже существует',
    
    // Уровни сложности
    INVALID_LEVEL: 'Неверный уровень сложности'
} as const;

// Регулярные выражения
export const VALIDATION_PATTERNS = {
    SLUG: /^[a-z0-9-]+$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    URL: /^https?:\/\/.+\..+/
} as const;
