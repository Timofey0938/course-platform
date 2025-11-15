// app/admin/courses/[id]/components/CourseFormAdapter/CourseFormAdapter.tsx
'use client';

import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CourseForm } from '../../../components/CourseForm/CourseForm';
import type { UseCourseEditReturn } from '../../hooks/useCourseEdit';
import { TITLE_TEXTS, DESCRIPTION_TEXTS, BUTTON_TEXTS, ROUTES } from '@/lib/constants';
import styles from './CourseFormAdapter.module.scss';

interface CourseFormAdapterProps {
    edit: UseCourseEditReturn;
    courseId: string;
}

export function CourseFormAdapter({ edit, courseId }: CourseFormAdapterProps) {
    // Адаптируем данные для CourseForm
    const adaptedForm = {
        formData: edit.formData || {
            id: courseId,
            title: '',
            description: '',
            slug: '',
            duration: '',
            level: 'beginner',
            cover_image_url: '',
            is_published: false
        },
        formErrors: edit.formErrors,
        isLoading: edit.isLoading,
        serverError: edit.serverError,
        handleChange: edit.handleChange,
        handleTitleChange: edit.handleChange, // Используем тот же обработчик
        handleBlur: edit.handleBlur,
        validateForm: edit.validateForm,
        setFormErrors: () => {}, // Не используется в адаптере
        setServerError: () => {}, // Не используется в адаптере
        setIsLoading: () => {}, // Не используется в адаптере
        hasErrors: edit.hasErrors,
        isFormValid: edit.isFormValid,
        isDirty: edit.isDirty,
        placeholderTexts: edit.placeholderTexts,
        helpTexts: edit.helpTexts,
        buttonTexts: edit.buttonTexts
    };

    if (edit.isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    {BUTTON_TEXTS.LOADING}
                </div>
            </div>
        );
    }

    if (!edit.course && !edit.isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2>Курс не найден</h2>
                    <p>Запрошенный курс не существует или у вас нет к нему доступа.</p>
                    <Link href={ROUTES.ADMIN_COURSES} className={styles.backButton}>
                        <ArrowLeft size={20} />
                        Вернуться к курсам
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Заголовок страницы */}
            <div className={styles.header}>
                <Link href={ROUTES.ADMIN_COURSES} className={styles.backButton}>
                    <ArrowLeft size={20} />
                    Назад к курсам
                </Link>
                <div>
                    <h1 className={styles.title}>{TITLE_TEXTS.EDIT_COURSE}</h1>
                    <p className={styles.subtitle}>
                        {DESCRIPTION_TEXTS.EDIT_COURSE}
                    </p>
                </div>
            </div>

            {/* Сообщение об ошибке сервера */}
            {edit.serverError && (
                <div className={styles.serverError}>
                    <ArrowLeft size={20} />
                    {edit.serverError}
                </div>
            )}

            {/* Компонент формы */}
            <CourseForm 
                form={adaptedForm}
                onSubmit={edit.handleSubmit}
                onCancel={() => window.history.back()}
                submitButtonText={edit.isSaving ? BUTTON_TEXTS.SAVING : BUTTON_TEXTS.UPDATE}
                submitButtonIcon={<Save size={20} />}
            />
        </div>
    );
}
