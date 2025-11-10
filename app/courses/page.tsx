import { CourseCard } from '@/components/CourseCard/CourseCard';
import { Header } from '@/components/Header/Header';
import { mockCourses } from '@/lib/mock-data';
import styles from './Courses.module.scss';

export default function CoursesPage() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Все курсы</h1>
                    <p className={styles.description}>
                        Полная коллекция мини-курсов по веб-разработке. 
                        Выбирайте тему и углубляйтесь в изучение.
                    </p>
                </div>
                
                <div className={styles.coursesGrid}>
                    {mockCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </>
    );
}
