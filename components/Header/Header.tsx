'use client';

import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

export function Header() {
    const pathname = usePathname();

    const handleLogin = () => {
        console.log('Login clicked'); // Заглушка
    };

    const isActive = (path: string) => {
        return pathname === path ? styles.active : '';
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <Link href="/" className={styles.logo}>
                        <BookOpen className={styles.logoIcon} />
                        <span className={styles.logoText}>DevCourses</span>
                    </Link>
                    
                    <nav className={styles.nav}>
                        <Link 
                            href="/courses" 
                            className={`${styles.navLink} ${isActive('/courses')}`}
                        >
                            Курсы
                        </Link>
                        <Link 
                            href="/about" 
                            className={`${styles.navLink} ${isActive('/about')}`}
                        >
                            О проекте
                        </Link>
                        <button className={styles.loginBtn} onClick={handleLogin}>
                            Войти
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
