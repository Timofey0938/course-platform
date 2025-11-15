// lib/validation/courseSchemas.ts
import { z } from 'zod';
import { 
    COURSE_LEVELS, 
    DATA_LIMITS, 
    VALIDATION_MESSAGES,
    VALIDATION_PATTERNS 
} from '@/lib/constants';

// Базовые схемы для переиспользования
export const idSchema = z.string().uuid(VALIDATION_MESSAGES.INVALID_LEVEL);

export const slugSchema = z.string()
    .min(1, VALIDATION_MESSAGES.SLUG_REQUIRED)
    .max(DATA_LIMITS.COURSE_SLUG_MAX, 
         VALIDATION_MESSAGES.TOO_LONG('URL-адрес', DATA_LIMITS.COURSE_SLUG_MAX))
    .regex(VALIDATION_PATTERNS.SLUG, VALIDATION_MESSAGES.INVALID_SLUG);

export const titleSchema = z.string()
    .min(1, VALIDATION_MESSAGES.TITLE_REQUIRED)
    .max(DATA_LIMITS.COURSE_TITLE_MAX, 
         VALIDATION_MESSAGES.TOO_LONG('название', DATA_LIMITS.COURSE_TITLE_MAX));

export const levelSchema = z.enum([
    COURSE_LEVELS.BEGINNER, 
    COURSE_LEVELS.INTERMEDIATE, 
    COURSE_LEVELS.ADVANCED
], {
    errorMap: () => ({ message: VALIDATION_MESSAGES.INVALID_LEVEL })
});

// Основные схемы для курсов
export const courseCreateSchema = z.object({
    title: titleSchema,
    description: z.string()
        .max(DATA_LIMITS.COURSE_DESCRIPTION_MAX, 
             VALIDATION_MESSAGES.TOO_LONG('описание', DATA_LIMITS.COURSE_DESCRIPTION_MAX))
        .nullable()
        .optional(),
    slug: slugSchema,
    cover_image_url: z.string()
        .url(VALIDATION_MESSAGES.INVALID_URL)
        .nullable()
        .optional(),
    duration: z.string()
        .max(DATA_LIMITS.COURSE_DURATION_MAX, 
             VALIDATION_MESSAGES.TOO_LONG('продолжительность', DATA_LIMITS.COURSE_DURATION_MAX))
        .nullable()
        .optional(),
    level: levelSchema.default(COURSE_LEVELS.BEGINNER),
    is_published: z.boolean().default(false),
});

export const courseUpdateSchema = courseCreateSchema.partial().extend({
    id: idSchema,
});

export const courseSchema = courseCreateSchema.extend({
    id: idSchema,
    order_index: z.number().int().min(0),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

// Типы для TypeScript (автоматически выводятся из схем!)
export type CourseCreateInput = z.infer<typeof courseCreateSchema>;
export type CourseUpdateInput = z.infer<typeof courseUpdateSchema>;
export type Course = z.infer<typeof courseSchema>;
