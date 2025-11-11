// components/Header/Header.tsx
'use client';

import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserSection } from './UserSection/UserSection';
import styles from './Header.module.scss';

export function Header() {
    const pathname = usePathname();
    const { user, signInWithGoogle, isLoading } = useAuth();

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
                        
                        {user ? (
                            <UserSection />
                        ) : (
                            <button 
                                className={styles.loginBtn} 
                                onClick={signInWithGoogle}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Загрузка...' : 'Войти с Google'}
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
