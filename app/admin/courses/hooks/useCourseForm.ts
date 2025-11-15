// app/admin/courses/hooks/useCourseForm.ts
import { useState } from 'react';
import { courseCreateSchema, courseUpdateSchema, type CourseCreateInput, type CourseUpdateInput } from '@/lib/validation/courseSchemas';
import type { Course } from '@/lib/types';
import { 
    PLACEHOLDER_TEXTS, 
    HELP_TEXTS, 
    BUTTON_TEXTS,
    VALIDATION_MESSAGES 
} from '@/lib/constants';

export type FormMode = 'create' | 'edit';

export interface UseCourseFormProps {
    mode: FormMode;
    initialData?: Course; // Для режима редактирования
}

export interface UseCourseFormReturn {
    // Данные формы
    formData: CourseCreateInput | CourseUpdateInput;
    formErrors: Record<string, string>;
    isLoading: boolean;
    isSaving: boolean;
    serverError: string | null;
    
    // Обработчики
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    
    // Валидация
    validateForm: () => boolean;
    
    // Setters
    setFormErrors: (errors: Record<string, string>) => void;
    setServerError: (error: string | null) => void;
    setIsLoading: (loading: boolean) => void;
    
    // Состояния
    hasErrors: boolean;
    isFormValid: boolean;
    isDirty: boolean;
    
    // Константы
    placeholderTexts: typeof PLACEHOLDER_TEXTS;
    helpTexts: typeof HELP_TEXTS;
    buttonTexts: typeof BUTTON_TEXTS;
    mode: FormMode;
}

export const useCourseForm = ({ mode, initialData }: UseCourseFormProps): UseCourseFormReturn => {
    const [isLoading, setIsLoading] = useState(mode === 'edit' && !initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    
    // Начальные данные в зависимости от режима
    const [formData, setFormData] = useState<CourseCreateInput | CourseUpdateInput>(() => {
        if (mode === 'edit' && initialData) {
            return {
                id: initialData.id,
                title: initialData.title,
                description: initialData.description || '',
                slug: initialData.slug,
                duration: initialData.duration || '',
                level: initialData.level,
                cover_image_url: initialData.cover_image_url || '',
                is_published: initialData.is_published
            };
        }
        
        // Режим создания
        return {
            title: '',
            description: '',
            slug: '',
            duration: '',
            level: 'beginner',
            cover_image_url: '',
            is_published: false
        };
    });

    // Валидация отдельного поля
    const validateField = (name: string, value: any): string | null => {
        const schema = mode === 'create' ? courseCreateSchema : courseUpdateSchema;
        const fieldSchema = schema.pick({ [name]: true });
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

    // Специальный обработчик для textarea
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    
        if (!isDirty) {
            setIsDirty(true);
        }
    
        if (formErrors[name]) {
            const error = validateField(name, value);
            setFormErrors(prev => ({
                ...prev,
                [name]: error || ''
            }));
        }
    };

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
        const schema = mode === 'create' ? courseCreateSchema : courseUpdateSchema;
        const validationResult = schema.safeParse(formData);
        
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

    const hasErrors = Object.values(formErrors).some(error => error !== '');
    const isFormValid = !hasErrors && formData.title && formData.slug;

    return {
        // Данные формы
        formData,
        formErrors,
        isLoading,
        isSaving,
        serverError,
        
        // Обработчики
        handleChange,
        handleTitleChange,
        handleBlur,
        handleTextareaChange,
        
        // Валидация
        validateForm,
        
        // Setters
        setFormErrors,
        setServerError,
        setIsLoading,
        
        // Состояния
        hasErrors,
        isFormValid,
        isDirty,
        
        // Константы
        placeholderTexts: PLACEHOLDER_TEXTS,
        helpTexts: HELP_TEXTS,
        buttonTexts: BUTTON_TEXTS,
        mode
    };
};
