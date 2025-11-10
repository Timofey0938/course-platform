// app/page.tsx
'use client';

import { Header } from '@/components/Header/Header';
import { CourseCard } from '@/components/CourseCard/CourseCard';
import { mockCourses } from '@/lib/mock-data';
import { Globe, Users, BookOpen, ArrowRight, Code2 } from 'lucide-react';
import Link from 'next/link';
import styles from './Home.module.scss';

export default function HomePage() {
    const featuredCourses = mockCourses.slice(0, 3);

    return (
        <>
            <Header />
            
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Глубокое понимание
                        <span className={styles.gradientText}> веб-технологий</span>
                    </h1>
                    <p className={styles.heroDescription}>
                        Мини-курсы, которые объясняют не просто "как", а "почему" работают 
                        технологии современного веба. От основ до продвинутых концепций.
                    </p>
                    <div className={styles.heroButtons}>
                        <Link href="/courses" className={styles.primaryButton}>
                            Начать обучение
                            <ArrowRight size={18} />
                        </Link>
                        <Link href="/about" className={styles.secondaryButton}>
                            О проекте
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Почему DevCourses?</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <Code2 className={styles.featureIcon} />
                            <h3>Фокусировка на основах</h3>
                            <p>Каждый курс разбирает одну ключевую технологию от А до Я</p>
                        </div>
                        <div className={styles.featureCard}>
                            <BookOpen className={styles.featureIcon} />
                            <h3>Практические знания</h3>
                            <p>Теория, которая сразу применяется в реальных проектах</p>
                        </div>
                        <div className={styles.featureCard}>
                            <Users className={styles.featureIcon} />
                            <h3>Для всех уровней</h3>
                            <p>От начинающих до опытных разработчиков</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className={styles.coursesSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Популярные курсы</h2>
                        <p className={styles.sectionDescription}>
                            Начните с самых востребованных тем в веб-разработке
                        </p>
                        <Link href="/courses" className={styles.viewAllLink}>
                            Смотреть все курсы <ArrowRight size={16} />
                        </Link>
                    </div>
                    
                    <div className={styles.coursesGrid}>
                        {featuredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
