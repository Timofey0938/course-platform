// lib/services/course/courseValidators.ts
import { 
    courseCreateSchema, 
    courseUpdateSchema 
} from '@/lib/validation/courseSchemas';

export class CourseValidators {
    /**
     * Валидация данных для создания курса
     */
    static validateCreateData(courseData: unknown) {
        const validationResult = courseCreateSchema.safeParse(courseData);
        
        if (!validationResult.success) {
            const errorMessage = validationResult.error.errors
                .map(err => `${err.path.join('.')}: ${err.message}`)
                .join(', ');
            
            return {
                success: false as const,
                error: `Ошибка валидации: ${errorMessage}`,
                data: null
            };
        }

        return {
            success: true as const,
            data: validationResult.data,
            error: null
        };
    }

    /**
     * Валидация данных для обновления курса
     */
    static validateUpdateData(courseData: unknown) {
        const validationResult = courseUpdateSchema.safeParse(courseData);
        
        if (!validationResult.success) {
            const errorMessage = validationResult.error.errors
                .map(err => `${err.path.join('.')}: ${err.message}`)
                .join(', ');
            
            return {
                success: false as const,
                error: `Ошибка валидации: ${errorMessage}`,
                data: null
            };
        }

        return {
            success: true as const,
            data: validationResult.data,
            error: null
        };
    }

    /**
     * Генерация сообщений об ошибках
     */
    static generateErrorMessage(operation: string, error: any): string {
        if (error.code === '23505') { // PostgreSQL unique violation
            return 'Курс с таким URL-адресом уже существует';
        }
        
        return error.message || `Неизвестная ошибка при ${operation} курса`;
    }
}
