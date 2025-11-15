// app/admin/courses/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';
import { courseService } from '@/lib/services';
import { CourseForm } from '../components/CourseForm/CourseForm';
import { useCourseForm } from '../hooks/useCourseForm';
import { Alert, Button } from '@/components/ui';
import { useToasts } from '@/lib/utils/toast';
import { TITLE_TEXTS, DESCRIPTION_TEXTS, BUTTON_TEXTS, ROUTES, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';
import styles from './NewCourse.module.scss';

export default function NewCoursePage() {
    const router = useRouter();
    const form = useCourseForm({ mode: 'create' });
    const { success, error: toastError } = useToasts();

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

            const result = await courseService.createCourse(form.formData);
            
            if (result.success && result.data) {
                // ✅ Заменяем alert на toast
                success(SUCCESS_MESSAGES.COURSE_CREATED);
                
                router.push(ROUTES.ADMIN_COURSES);
                router.refresh();
            } else {
                // ✅ Заменяем alert на toast
                toastError(result.error || ERROR_MESSAGES.COURSE_CREATE_FAILED);
                form.setServerError(result.error || ERROR_MESSAGES.COURSE_CREATE_FAILED);
            }
        } catch (err) {
            console.error('Error creating course:', err);
            // ✅ Заменяем alert на toast
            toastError(ERROR_MESSAGES.UNEXPECTED_ERROR);
            form.setServerError(ERROR_MESSAGES.UNEXPECTED_ERROR);
        } finally {
            form.setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push(ROUTES.ADMIN_COURSES);
    };

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
                        <h1 className={styles.title}>{TITLE_TEXTS.CREATE_COURSE}</h1>
                        <p className={styles.subtitle}>
                            {DESCRIPTION_TEXTS.CREATE_COURSE}
                        </p>
                    </div>
                </div>

                {/* Сообщение об ошибке сервера */}
                {form.serverError && (
                    <Alert 
                        variant="error"
                        title="Ошибка создания курса"
                        className={styles.serverError}
                    >
                        {form.serverError}
                    </Alert>
                )}

                {/* Компонент формы */}
                <CourseForm 
                    form={form}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    submitButtonText={form.isLoading ? BUTTON_TEXTS.CREATING : BUTTON_TEXTS.CREATE}
                />
            </div>
        </ProtectedRoute>
    );
}
