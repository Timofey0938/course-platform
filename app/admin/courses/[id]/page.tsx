// app/admin/courses/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';
import { courseService } from '@/lib/services';
import { CourseForm } from '../components/CourseForm/CourseForm';
import { useCourseForm } from '../hooks/useCourseForm';
import type { Course } from '@/lib/types';
import { Alert, Button } from '@/components/ui';
import { useToasts } from '@/lib/utils/toast';
import { 
    TITLE_TEXTS, 
    DESCRIPTION_TEXTS, 
    BUTTON_TEXTS, 
    ROUTES, 
    ERROR_MESSAGES, 
    SUCCESS_MESSAGES 
} from '@/lib/constants';
import styles from './EditCourse.module.scss';

// Хук для загрузки данных курса
const useCourseData = (courseId: string) => {
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCourse = async () => {
            if (!courseId) {
                setError('ID курса не указан');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            
            try {
                const result = await courseService.getCourseById(courseId);
                
                if (result.success && result.data) {
                    setCourse(result.data);
                } else {
                    setError(result.error || ERROR_MESSAGES.COURSE_NOT_FOUND);
                }
            } catch (err) {
                console.error('Error loading course:', err);
                setError(ERROR_MESSAGES.COURSE_LOAD_FAILED);
            } finally {
                setIsLoading(false);
            }
        };

        loadCourse();
    }, [courseId]);

    return { course, isLoading, error };
};

export default function EditCoursePage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params.id as string;
    const { success, error: toastError } = useToasts();
    
    const { course, isLoading: isCourseLoading, error: courseError } = useCourseData(courseId);
    const form = useCourseForm({ 
        mode: 'edit', 
        initialData: course 
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (form.isLoading || form.isSaving) return;

        form.setIsLoading(true);
        form.setServerError(null);

        try {
            if (!form.validateForm()) {
                form.setIsLoading(false);
                return;
            }

            const result = await courseService.updateCourse(form.formData);
            
            if (result.success && result.data) {
                // ✅ Заменяем alert на toast
                success(SUCCESS_MESSAGES.COURSE_UPDATED);
                
                router.push(ROUTES.ADMIN_COURSES);
                router.refresh();
            } else {
                // ✅ Заменяем alert на toast
                toastError(result.error || ERROR_MESSAGES.COURSE_UPDATE_FAILED);
                form.setServerError(result.error || ERROR_MESSAGES.COURSE_UPDATE_FAILED);
            }
        } catch (err) {
            console.error('Error updating course:', err);
            // ✅ Заменяем alert на toast
            toastError(ERROR_MESSAGES.UNEXPECTED_ERROR);
            form.setServerError(ERROR_MESSAGES.UNEXPECTED_ERROR);
        } finally {
            form.setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (form.isDirty) {
            const confirmLeave = confirm(
                'У вас есть несохраненные изменения. Вы уверены, что хотите уйти?'
            );
            if (!confirmLeave) return;
        }
        
        router.push(ROUTES.ADMIN_COURSES);
    };

    if (isCourseLoading) {
        return (
            <ProtectedRoute requireAdmin={true}>
                <div className={styles.container}>
                    <div className={styles.loading}>
                        {BUTTON_TEXTS.LOADING}
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    if (courseError || !course) {
        return (
            <ProtectedRoute requireAdmin={true}>
                <div className={styles.container}>
                    <Alert 
                        variant="error"
                        title="Курс не найден"
                        className={styles.errorAlert}
                    >
                        {courseError || ERROR_MESSAGES.COURSE_NOT_FOUND}
                    </Alert>
                    
                    <Link href={ROUTES.ADMIN_COURSES}>
                        <Button variant="primary" icon={ArrowLeft}>
                            Вернуться к курсам
                        </Button>
                    </Link>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute requireAdmin={true}>
            <div className={styles.container}>
                {/* Заголовок страницы */}
                <div className={styles.header}>
                    <Link href={ROUTES.ADMIN_COURSES}>
                        <Button variant="ghost" icon={ArrowLeft} className={styles.backButton}>
                            Назад к курсам
                        </Button>
                    </Link>
                    
                    <div>
                        <h1 className={styles.title}>{TITLE_TEXTS.EDIT_COURSE}</h1>
                        <p className={styles.subtitle}>
                            {DESCRIPTION_TEXTS.EDIT_COURSE}
                        </p>
                    </div>
                </div>

                {/* Сообщение об ошибке сервера */}
                {form.serverError && (
                    <Alert 
                        variant="error"
                        title="Ошибка обновления курса"
                        className={styles.serverError}
                    >
                        {form.serverError}
                    </Alert>
                )}

                {/* Предупреждение о несохраненных изменениях */}
                {form.isDirty && (
                    <Alert 
                        variant="warning"
                        className={styles.unsavedWarning}
                    >
                        У вас есть несохраненные изменения
                    </Alert>
                )}

                {/* Компонент формы */}
                <CourseForm 
                    form={form}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    submitButtonText={form.isLoading ? BUTTON_TEXTS.SAVING : BUTTON_TEXTS.UPDATE}
                />
            </div>
        </ProtectedRoute>
    );
}
