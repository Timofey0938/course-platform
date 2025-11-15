// app/admin/courses/page.tsx
'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';
import { useCoursesList } from './hooks/useCoursesList';
import { CourseCard } from './components/CourseCard/CourseCard';
import { EmptyState } from './components/EmptyState/EmptyState';
import { Alert, Button } from '@/components/ui';
import { useToasts } from '@/lib/utils/toast';
import { TITLE_TEXTS, DESCRIPTION_TEXTS, BUTTON_TEXTS, ROUTES, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';
import styles from './Courses.module.scss';

export default function AdminCoursesPage() {
    const { courses, isLoading, error, deleteCourse } = useCoursesList();
    const { success, error: toastError } = useToasts();

    const handleDeleteCourse = async (courseId: string) => {
        const result = await deleteCourse(courseId);
        
        if (result) {
            // ✅ Показываем toast при успешном удалении
            success(SUCCESS_MESSAGES.COURSE_DELETED);
        } else {
            // ✅ Показываем toast при ошибке удаления
            toastError(ERROR_MESSAGES.COURSE_DELETE_FAILED);
        }
    };

    if (isLoading) {
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

    return (
        <ProtectedRoute requireAdmin={true}>
            <div className={styles.container}>
                {/* Заголовок страницы */}
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>{TITLE_TEXTS.COURSE_MANAGEMENT}</h1>
                        <p className={styles.subtitle}>
                            {DESCRIPTION_TEXTS.COURSE_MANAGEMENT}
                        </p>
                    </div>
                    <Link href={ROUTES.ADMIN_COURSES_NEW}>
                        <Button variant="primary" icon={Plus}>
                            {BUTTON_TEXTS.CREATE}
                        </Button>
                    </Link>
                </div>

                {/* Сообщение об ошибке */}
                {error && (
                    <Alert 
                        variant="error" 
                        title="Ошибка загрузки"
                        dismissible
                        onDismiss={() => window.location.reload()}
                    >
                        {error}
                    </Alert>
                )}

                {/* Список курсов */}
                <div className={styles.coursesList}>
                    {courses.length === 0 && !error ? (
                        <EmptyState />
                    ) : (
                        courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onDelete={handleDeleteCourse}
                            />
                        ))
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
