// app/admin/courses/new/hooks/useCourseForm.ts
import { useState } from 'react';
import { courseCreateSchema, type CourseCreateInput } from '@/lib/validation/courseSchemas';
import { 
    PLACEHOLDER_TEXTS, 
    HELP_TEXTS, 
    BUTTON_TEXTS,
    VALIDATION_MESSAGES 
} from '@/lib/constants';

export interface UseCourseFormReturn {
    // Данные формы
    formData: CourseCreateInput;
    formErrors: Record<string, string>;
    isLoading: boolean;
    serverError: string | null;
    
    // Обработчики
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    
    // Валидация
    validateForm: () => boolean;
    validateField: (name: string, value: any) => string | null;
    
    // Setters
    setFormErrors: (errors: Record<string, string>) => void;
    setServerError: (error: string | null) => void;
    setIsLoading: (loading: boolean) => void;
    resetForm: () => void;
    
    // Состояния
    hasErrors: boolean;
    isFormValid: boolean;
    isDirty: boolean;
    
    // Константы для UI
    placeholderTexts: typeof PLACEHOLDER_TEXTS;
    helpTexts: typeof HELP_TEXTS;
    buttonTexts: typeof BUTTON_TEXTS;
}

export const useCourseForm = (): UseCourseFormReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    
    const [formData, setFormData] = useState<CourseCreateInput>({
        title: '',
        description: '',
        slug: '',
        duration: '',
        level: 'beginner',
        cover_image_url: '',
        is_published: false
    });

    // Валидация отдельного поля
    const validateField = (name: string, value: any): string | null => {
        const fieldSchema = courseCreateSchema.pick({ [name]: true });
        const result = fieldSchema.safeParse({ [name]: value });
        
        if (!result.success) {
            return result.error.errors[0]?.message || VALIDATION_MESSAGES.REQUIRED;
        }
        
        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        const newValue = type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Помечаем форму как измененную
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

    // Валидация при уходе с поля
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        const error = validateField(name, value);
        setFormErrors(prev => ({
            ...prev,
            [name]: error || ''
        }));
    };

    const generateSlug = (title: string): string => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9а-яё\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const generatedSlug = generateSlug(title);
        
        setFormData(prev => ({
            ...prev,
            title,
            slug: generatedSlug
        }));

        if (!isDirty) {
            setIsDirty(true);
        }

        // Валидируем оба поля
        const titleError = validateField('title', title);
        const slugError = validateField('slug', generatedSlug);
        
        setFormErrors(prev => ({
            ...prev,
            title: titleError || '',
            slug: slugError || ''
        }));
    };

    const validateForm = (): boolean => {
        const validationResult = courseCreateSchema.safeParse(formData);
        
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

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            slug: '',
            duration: '',
            level: 'beginner',
            cover_image_url: '',
            is_published: false
        });
        setFormErrors({});
        setServerError(null);
        setIsDirty(false);
    };

    const hasErrors = Object.values(formErrors).some(error => error !== '');
    const isFormValid = !hasErrors && formData.title && formData.slug;

    return {
        // Данные формы
        formData,
        formErrors,
        isLoading,
        serverError,
        
        // Обработчики
        handleChange,
        handleTitleChange,
        handleBlur,
        
        // Валидация
        validateForm,
        validateField,
        
        // Setters
        setFormErrors,
        setServerError,
        setIsLoading,
        resetForm,
        
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
