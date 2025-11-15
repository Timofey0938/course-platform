// app/admin/page.tsx
'use client';

import { BookOpen, Settings, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Admin.module.scss';

export default function AdminPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { isAdmin, isLoading: roleLoading, userProfile } = useUserRole();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Ждем завершения всех проверок
        if (!authLoading && !roleLoading) {
            setIsChecking(false);
            
            if (!user) {
                router.push('/');
                return;
            }

            if (!isAdmin) {
                router.push('/');
                return;
            }
        }
    }, [user, isAdmin, authLoading, roleLoading, router]);

    // Получаем отображаемое имя пользователя
    const getDisplayName = () => {
        if (!user) return '';
        
        // Сначала пытаемся получить из профиля
        if (userProfile?.full_name) {
            return userProfile.full_name;
        }
        
        // Затем из user_metadata Google
        const userMetadata = user.user_metadata;
        if (userMetadata.full_name) {
            return userMetadata.full_name;
        }
        if (userMetadata.name) {
            return userMetadata.name;
        }
        
        // Если ничего нет, используем часть email
        return user.email?.split('@')[0] || 'Администратор';
    };

    // Показываем loading пока проверяем права
    if (isChecking || authLoading || roleLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    Проверка прав доступа...
                </div>
            </div>
        );
    }

    // Если проверка завершена и пользователь не админ - показываем сообщение
    if (!user || !isAdmin) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2>Доступ запрещен</h2>
                    <p>У вас недостаточно прав для доступа к этой странице.</p>
                    <Link href="/" className={styles.backButton}>
                        Вернуться на главную
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Панель администратора</h1>
                <p className={styles.subtitle}>
                    Добро пожаловать, {getDisplayName()}!
                </p>
            </div>

            <div className={styles.grid}>
                <Link href="/admin/courses" className={styles.card}>
                    <BookOpen className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>Курсы</h3>
                    <p className={styles.cardDescription}>
                        Управление курсами и модулями
                    </p>
                </Link>

                <Link href="/admin/users" className={styles.card}>
                    <Users className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>Пользователи</h3>
                    <p className={styles.cardDescription}>
                        Управление пользователями и правами
                    </p>
                </Link>

                <Link href="/admin/analytics" className={styles.card}>
                    <BarChart3 className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>Аналитика</h3>
                    <p className={styles.cardDescription}>
                        Статистика и отчеты по платформе
                    </p>
                </Link>

                <Link href="/admin/settings" className={styles.card}>
                    <Settings className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>Настройки</h3>
                    <p className={styles.cardDescription}>
                        Настройки платформы и системы
                    </p>
                </Link>
            </div>
        </div>
    );
}
