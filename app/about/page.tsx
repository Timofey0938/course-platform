// app/about/page.tsx
import { Code2, Users, BookOpen } from 'lucide-react';
import styles from './About.module.scss';

export default function AboutPage() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>О проекте</h1>
                    <p className={styles.subtitle}>
                        Платформа для глубокого понимания веб-технологий
                    </p>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Что это такое?</h2>
                        <p className={styles.text}>
                            DevCourses — это коллекция мини-курсов, созданных для разработчиков, 
                            которые хотят понять не просто "как", но и "почему" работают веб-технологии.
                        </p>
                        <p className={styles.text}>
                            Каждый курс фокусируется на одной конкретной теме, разбирая ее от основ 
                            до глубоких деталей реализации.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Для кого это?</h2>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <Code2 className={styles.featureIcon} />
                                <div>
                                    <h3>Начинающие разработчики</h3>
                                    <p>Поймете фундаментальные концепции веба</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <Users className={styles.featureIcon} />
                                <div>
                                    <h3>Опытные инженеры</h3>
                                    <p>Углубите знания в специфичных областях</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <BookOpen className={styles.featureIcon} />
                                <div>
                                    <h3>Все любознательные</h3>
                                    <p>Узнаете как устроены технологии, которые мы используем каждый день</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Технологии</h2>
                        <p className={styles.text}>
                            Платформа построена на современном стеке: Next.js 14, TypeScript, 
                            SCSS модули и Supabase для хранения данных.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
