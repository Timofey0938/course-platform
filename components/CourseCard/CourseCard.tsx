import { Course } from '@/lib/mock-data';
import { Clock } from 'lucide-react';
import styles from './CourseCard.module.scss';

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <div className={styles.imagePlaceholder}>
                    Обложка курса
                </div>
            </div>
            
            <div className={styles.meta}>
                <span className={`${styles.level} ${styles[course.level]}`}>
                    {course.level === 'beginner' && 'Начальный'}
                    {course.level === 'intermediate' && 'Средний'}
                    {course.level === 'advanced' && 'Продвинутый'}
                </span>
                
                <div className={styles.duration}>
                    <Clock size={16} />
                    {course.duration}
                </div>
            </div>
            
            <h3 className={styles.title}>
                {course.title}
            </h3>
            
            <p className={styles.description}>
                {course.description}
            </p>
            
            <button className={styles.button}>
                Начать обучение
            </button>
        </div>
    );
}
