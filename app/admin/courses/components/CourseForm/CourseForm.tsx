// app/admin/courses/components/CourseForm/CourseForm.tsx
'use client';

import { Save } from 'lucide-react'; // Импортируем иконку
import { UseCourseFormReturn } from '../../hooks/useCourseForm';
import { Input, Select, Button } from '@/components/ui';
import { COURSE_LEVELS } from '@/lib/constants';
import formStyles from './CourseForm.module.scss';

interface CourseFormProps {
    form: UseCourseFormReturn;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    submitButtonText?: string;
}

export function CourseForm({ 
    form, 
    onSubmit, 
    onCancel,
    submitButtonText = 'Создать курс',
}: CourseFormProps) {
    const {
        formData,
        formErrors,
        isLoading,
        handleChange,
        handleTitleChange,
        handleBlur,
        handleTextareaChange,
        placeholderTexts,
        helpTexts,
        buttonTexts,
        isFormValid
    } = form;

    // Опции для уровня сложности
    const levelOptions = [
        { value: COURSE_LEVELS.BEGINNER, label: 'Начальный' },
        { value: COURSE_LEVELS.INTERMEDIATE, label: 'Средний' },
        { value: COURSE_LEVELS.ADVANCED, label: 'Продвинутый' }
    ];

    return (
        <form onSubmit={onSubmit} className={formStyles.form}>
            <div className={formStyles.formGrid}>
                {/* Название курса */}
                <Input
                    label="Название курса *"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    onBlur={handleBlur}
                    placeholder={placeholderTexts.COURSE_TITLE}
                    error={formErrors.title}
                    required
                    disabled={isLoading}
                />

                {/* URL-адрес (slug) */}
                <Input
                    label="URL-адрес (slug) *"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholderTexts.COURSE_SLUG}
                    error={formErrors.slug}
                    helperText={!formErrors.slug ? helpTexts.COURSE_SLUG : undefined}
                    required
                    disabled={isLoading}
                />

                {/* Описание курса */}
                <div className={formStyles.fullWidth}>
                    <Input
                        label="Описание курса"
                        name="description"
                        value={formData.description}
                        onChange={handleTextareaChange}
                        onBlur={handleBlur}
                        placeholder={placeholderTexts.COURSE_DESCRIPTION}
                        error={formErrors.description}
                        disabled={isLoading}
                        as="textarea"
                        rows={4}
                    />
                </div>

                {/* Продолжительность */}
                <Input
                    label="Продолжительность"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholderTexts.COURSE_DURATION}
                    disabled={isLoading}
                />

                {/* Уровень сложности */}
                <Select
                    label="Уровень сложности"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    options={levelOptions}
                    disabled={isLoading}
                />

                {/* URL обложки */}
                <Input
                    label="URL обложки"
                    name="cover_image_url"
                    value={formData.cover_image_url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholderTexts.COURSE_COVER_URL}
                    error={formErrors.cover_image_url}
                    disabled={isLoading}
                />
            </div>

            {/* Чекбокс публикации */}
            <div className={formStyles.checkboxSection}>
                <label className={formStyles.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                        className={formStyles.checkbox}
                        disabled={isLoading}
                    />
                    <span className={formStyles.checkboxText}>
                        Опубликовать курс сразу
                    </span>
                </label>
                <p className={formStyles.helpText}>
                    {helpTexts.COURSE_PUBLISH}
                </p>
            </div>

            {/* Кнопки действий */}
            <div className={formStyles.formActions}>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    {buttonTexts.CANCEL}
                </Button>
                <Button 
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    disabled={!isFormValid}
                    icon={Save} // Передаем компонент иконки, а не JSX элемент
                >
                    {isLoading ? buttonTexts.SAVING : submitButtonText}
                </Button>
            </div>
        </form>
    );
}
