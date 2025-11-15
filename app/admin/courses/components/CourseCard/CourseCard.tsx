// app/admin/courses/components/CourseCard/CourseCard.tsx
import { Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { COURSE_STATUS, ROUTES } from '@/lib/constants';
import { Card, Button } from '@/components/ui';
import styles from './CourseCard.module.scss';

interface CourseCardProps {
    course: Course;
    onDelete: (courseId: string) => void;
    isDeleting?: boolean;
}

export function CourseCard({ course, onDelete, isDeleting = false }: CourseCardProps) {
    const handleDelete = () => {
        if (confirm('Вы уверены, что хотите удалить этот курс?')) {
            onDelete(course.id);
        }
    };

    return (
        <Card variant="default" padding="md" hover className={styles.courseCard}>
            <div className={styles.courseInfo}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>
                    {course.description || 'Описание отсутствует'}
                </p>
                <div className={styles.courseMeta}>
                    <span className={`${styles.status} ${
                        course.is_published ? styles.published : styles.draft
                    }`}>
                        {course.is_published ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT}
                    </span>
                    <span className={styles.slug}>/{course.slug}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <Link 
                    href={`/courses/${course.slug}`}
                    target="_blank"
                    title="Посмотреть на сайте"
                >
                    <Button variant="ghost" size="sm">
                        <Eye size={16} />
                    </Button>
                </Link>
                
                <Link 
                    href={`/admin/courses/${course.id}`}
                    title="Редактировать"
                >
                    <Button variant="ghost" size="sm">
                        <Edit size={16} />
                    </Button>
                </Link>
                
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    title="Удалить"
                    className={styles.deleteButton}
                >
                    <Trash2 size={16} />
                </Button>
            </div>
        </Card>
    );
}
