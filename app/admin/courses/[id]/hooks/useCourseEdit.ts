// app/admin/courses/[id]/hooks/useCourseEdit.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { courseService } from '@/lib/services';
import { courseUpdateSchema, type CourseUpdateInput } from '@/lib/validation/courseSchemas';
import type { Course } from '@/lib/types';
import { 
    PLACEHOLDER_TEXTS, 
    HELP_TEXTS, 
    BUTTON_TEXTS,
    VALIDATION_MESSAGES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
} from '@/lib/constants';

export interface UseCourseEditReturn {
    // Данные
    course: Course | null;
    formData: CourseUpdateInput | null;
    formErrors: Record<string, string>;
    isLoading: boolean;
    isSaving: boolean;
    serverError: string | null;
    
    // Обработчики
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    
    // Действия
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    validateForm: () => boolean;
    
    // Состояния
    hasErrors: boolean;
    isFormValid: boolean;
    isDirty: boolean;
    
    // Константы
    placeholderTexts: typeof PLACEHOLDER_TEXTS;
    helpTexts: typeof HELP_TEXTS;
    buttonTexts: typeof BUTTON_TEXTS;
}

export const useCourseEdit = (courseId: string): UseCourseEditReturn => {
    const router = useRouter();
    
    const [course, setCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState<CourseUpdateInput | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    // Загрузка курса
    useEffect(() => {
        const loadCourse = async () => {
            setIsLoading(true);
            setServerError(null);
            
            try {
                const result = await courseService.getCourseById(courseId);
                
                if (result.success && result.data) {
                    setCourse(result.data);
                    setFormData({
                        id: result.data.id,
                        title: result.data.title,
                        description: result.data.description || '',
                        slug: result.data.slug,
                        duration: result.data.duration || '',
                        level: result.data.level,
                        cover_image_url: result.data.cover_image_url || '',
                        is_published: result.data.is_published
                    });
                } else {
                    setServerError(result.error || ERROR_MESSAGES.COURSE_NOT_FOUND);
                }
            } catch (err) {
                console.error('Error loading course:', err);
                setServerError(ERROR_MESSAGES.COURSE_LOAD_FAILED);
            } finally {
                setIsLoading(false);
            }
        };

        if (courseId) {
            loadCourse();
        }
    }, [courseId]);

    // Валидация отдельного поля
    const validateField = (name: string, value: any): string | null => {
        if (!formData) return null;
        
        const fieldSchema = courseUpdateSchema.pick({ [name]: true });
        const result = fieldSchema.safeParse({ [name]: value });
        
        if (!result.success) {
            return result.error.errors[0]?.message || VALIDATION_MESSAGES.REQUIRED;
        }
        
        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!formData) return;
        
        const { name, value, type } = e.target;
        
        const newValue = type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : value;

        setFormData(prev => prev ? {
            ...prev,
            [name]: newValue
        } : null);

        if (!isDirty) {
            setIsDirty(true);
        }

        // Валидация на лету для полей с ошибками
        if (formErrors[name]) {
            const error = validateField(name, newValue);
            setFormErrors(prev => ({
                ...prev,
                [name]: error || ''
            }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!formData) return;
        
        const { name, value } = e.target;
        
        const error = validateField(name, value);
        setFormErrors(prev => ({
            ...prev,
            [name]: error || ''
        }));
    };

    const validateForm = (): boolean => {
        if (!formData) return false;
        
        const validationResult = courseUpdateSchema.safeParse(formData);
        
        if (!validationResult.success) {
            const errors: Record<string, string> = {};
            validationResult.error.errors.forEach(err => {
                if (err.path[0]) {
                    const fieldName = err.path[0] as string;
                    errors[fieldName] = err.message;
                }
            });
            setFormErrors(errors);
            return false;
        }

        setFormErrors({});
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData || !validateForm()) {
            return;
        }

        setIsSaving(true);
        setServerError(null);

        try {
            const result = await courseService.updateCourse(formData);
            
            if (result.success && result.data) {
                // Обновляем локальные данные
                setCourse(result.data);
                setIsDirty(false);
                
                // Показываем успех и редиректим
                alert(SUCCESS_MESSAGES.COURSE_UPDATED);
                router.push('/admin/courses');
                router.refresh();
            } else {
                setServerError(result.error || ERROR_MESSAGES.COURSE_UPDATE_FAILED);
            }
        } catch (err) {
            console.error('Error updating course:', err);
            setServerError(ERROR_MESSAGES.UNEXPECTED_ERROR);
        } finally {
            setIsSaving(false);
        }
    };

    const hasErrors = Object.values(formErrors).some(error => error !== '');
    const isFormValid = !hasErrors && formData?.title && formData?.slug;

    return {
        // Данные
        course,
        formData,
        formErrors,
        isLoading,
        isSaving,
        serverError,
        
        // Обработчики
        handleChange,
        handleBlur,
        
        // Действия
        handleSubmit,
        validateForm,
        
        // Состояния
        hasErrors,
        isFormValid,
        isDirty,
        
        // Константы
        placeholderTexts: PLACEHOLDER_TEXTS,
        helpTexts: HELP_TEXTS,
        buttonTexts: BUTTON_TEXTS
    };
};
