// lib/services/course/CourseService.ts
import type { Course, ApiResponse } from '@/lib/types';
import { CourseValidators } from './courseValidators';
import { CourseQueries } from './courseQueries';

export class CourseService {
    private static instance: CourseService;
    private queries = new CourseQueries();

    public static getInstance(): CourseService {
        if (!CourseService.instance) {
            CourseService.instance = new CourseService();
        }
        return CourseService.instance;
    }

    /**
     * Получить все курсы
     */
    async getCourses(): Promise<ApiResponse<Course[]>> {
        try {
            const { data, error } = await this.queries.selectAll();

            if (error) {
                console.error('Error fetching courses:', error);
                return this.createErrorResponse(error.message);
            }

            return this.createSuccessResponse(data || []);
        } catch (error) {
            console.error('Unexpected error:', error);
            return this.createUnexpectedErrorResponse(error);
        }
    }

    /**
     * Получить курс по ID
     */
    async getCourseById(id: string): Promise<ApiResponse<Course>> {
        try {
            const { data, error } = await this.queries.selectById(id);

            if (error) {
                console.error('Error fetching course by ID:', error);
                return this.createErrorResponse(error.message);
            }

            return this.createSuccessResponse(data);
        } catch (error) {
            console.error('Unexpected error:', error);
            return this.createUnexpectedErrorResponse(error);
        }
    }

    /**
     * Получить курс по slug
     */
    async getCourseBySlug(slug: string): Promise<ApiResponse<Course>> {
        try {
            const { data, error } = await this.queries.selectBySlug(slug);

            if (error) {
                console.error('Error fetching course by slug:', error);
                return this.createErrorResponse(error.message);
            }

            return this.createSuccessResponse(data);
        } catch (error) {
            console.error('Unexpected error:', error);
            return this.createUnexpectedErrorResponse(error);
        }
    }

    /**
     * Создать новый курс
     */
    async createCourse(courseData: unknown): Promise<ApiResponse<Course>> {
        try {
            // Валидация данных
            const validation = CourseValidators.validateCreateData(courseData);
            if (!validation.success) {
                return this.createErrorResponse(validation.error);
            }

            // Проверка уникальности slug
            const slugCheck = await this.getCourseBySlug(validation.data.slug);
            if (slugCheck.success && slugCheck.data) {
                return this.createErrorResponse('Курс с таким URL-адресом уже существует');
            }

            // Создание курса
            const { data, error } = await this.queries.insert(validation.data);

            if (error) {
                console.error('Error creating course:', error);
                return this.createErrorResponse(
                    CourseValidators.generateErrorMessage('создании', error)
                );
            }

            console.log('Course created successfully:', data.id);
            return this.createSuccessResponse(data);
        } catch (error) {
            console.error('Unexpected error creating course:', error);
            return this.createUnexpectedErrorResponse(error);
        }
    }

    /**
     * Обновить курс
     */
    async updateCourse(courseData: unknown): Promise<ApiResponse<Course>> {
        try {
            // Валидация данных
            const validation = CourseValidators.validateUpdateData(courseData);
            if (!validation.success) {
                return this.createErrorResponse(validation.error);
            }

            // Если обновляется slug, проверяем уникальность
            if (validation.data.slug) {
                const existingCourse = await this.getCourseBySlug(validation.data.slug);
                if (existingCourse.success && existingCourse.data && 
                    existingCourse.data.id !== validation.data.id) {
                    return this.createErrorResponse('Курс с таким URL-адресом уже существует');
                }
            }

            // Обновление курса
            const { data, error } = await this.queries.update(
                validation.data.id, 
                validation.data
            );

            if (error) {
                console.error('Error updating course:', error);
                return this.createErrorResponse(
                    CourseValidators.generateErrorMessage('обновлении', error)
                );
            }

            console.log('Course updated successfully:', data.id);
            return this.createSuccessResponse(data);
        } catch (error) {
            console.error('Unexpected error updating course:', error);
            return this.createUnexpectedErrorResponse(error);
        }
    }

    /**
     * Удалить курс
     */
    async deleteCourse(id: string): Promise<ApiResponse<void>> {
        try {
            const { error } = await this.queries.delete(id);

            if (error) {
                console.error('Error deleting course:', error);
                return this.createErrorResponse(error.message);
            }

            console.log('Course deleted successfully:', id);
            return this.createSuccessResponse(null);
        } catch (error) {
            console.error('Unexpected error deleting course:', error);
            return this.createUnexpectedErrorResponse(error);
        }
    }

    /**
     * Получить опубликованные курсы
     */
    async getPublishedCourses(): Promise<ApiResponse<Course[]>> {
        try {
            const { data, error } = await this.queries.selectPublished();

            if (error) {
                console.error('Error fetching published courses:', error);
                return this.createErrorResponse(error.message);
            }

            return this.createSuccessResponse(data || []);
        } catch (error) {
            console.error('Unexpected error:', error);
            return this.createUnexpectedErrorResponse(error);
        }
    }

    /**
     * Переключить статус публикации
     */
    async toggleCoursePublish(id: string, isPublished: boolean): Promise<ApiResponse<Course>> {
        try {
            const { data, error } = await this.queries.togglePublish(id, isPublished);

            if (error) {
                console.error('Error toggling course publish status:', error);
                return this.createErrorResponse(error.message);
            }

            console.log(`Course ${isPublished ? 'published' : 'unpublished'}:`, id);
            return this.createSuccessResponse(data);
        } catch (error) {
            console.error('Unexpected error toggling course publish:', error);
            return this.createUnexpectedErrorResponse(error);
        }
    }

    /**
     * Вспомогательные методы для создания ответов
     */
    private createSuccessResponse<T>(data: T): ApiResponse<T> {
        return { data, error: null, success: true };
    }

    private createErrorResponse<T>(error: string): ApiResponse<T> {
        return { data: null, error, success: false };
    }

    private createUnexpectedErrorResponse<T>(error: unknown): ApiResponse<T> {
        return { 
            data: null, 
            error: error instanceof Error ? error.message : 'Unknown error', 
            success: false 
        };
    }
}
