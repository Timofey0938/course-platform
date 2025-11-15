// lib/constants/app.ts

// Настройки приложения
export const APP_CONFIG = {
    NAME: 'DevCourses',
    DESCRIPTION: 'Платформа для мини-курсов по веб-программированию',
    VERSION: '1.0.0',
    SUPPORT_EMAIL: 'support@devcourses.ru'
} as const;

// Роли пользователей
export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
} as const;

// Уровни сложности курсов
export const COURSE_LEVELS = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate', 
    ADVANCED: 'advanced'
} as const;

// Статусы курсов
export const COURSE_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published'
} as const;

// Лимиты данных
export const DATA_LIMITS = {
    COURSE_TITLE_MAX: 200,
    COURSE_DESCRIPTION_MAX: 1000,
    COURSE_SLUG_MAX: 100,
    COURSE_DURATION_MAX: 50
} as const;

// Пути маршрутов
export const ROUTES = {
    HOME: '/',
    COURSES: '/courses',
    ABOUT: '/about',
    ADMIN: '/admin',
    ADMIN_COURSES: '/admin/courses',
    ADMIN_COURSES_NEW: '/admin/courses/new'
} as const;
