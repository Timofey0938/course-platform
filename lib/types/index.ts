// lib/types/index.ts

// Базовые типы для всего приложения
export interface User {
    id: string;
    email: string;
    user_metadata?: {
        full_name?: string;
        name?: string;
        avatar_url?: string;
        picture?: string;
    };
}

// Типы для курсов (расширяем существующие)
export interface Course {
    id: string;
    title: string;
    description: string | null;
    slug: string;
    cover_image_url: string | null;
    duration: string | null;
    level: 'beginner' | 'intermediate' | 'advanced';
    order_index: number;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface CourseCreate {
    title: string;
    description?: string | null;
    slug: string;
    cover_image_url?: string | null;
    duration?: string | null;
    level?: 'beginner' | 'intermediate' | 'advanced';
    is_published?: boolean;
}

export interface CourseUpdate extends Partial<CourseCreate> {
    id: string;
}

// Типы для профилей пользователей
export interface UserProfile {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    role: 'user' | 'admin';
    created_at: string;
    updated_at: string;
}

// Типы для API ответов
export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    success: boolean;
}

// Типы для пагинации
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
