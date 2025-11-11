// components/Header/UserSection/UserSection.tsx
'use client';

import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import styles from './UserSection.module.scss';

interface UserProfile {
    displayName: string;
    avatarUrl: string | null;
    email: string;
}

export function UserSection() {
    const { user, signOut } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (user) {
            // Получаем данные из user_metadata Google OAuth
            const userMetadata = user.user_metadata;
            setUserProfile({
                displayName: userMetadata.full_name || userMetadata.name || user.email?.split('@')[0] || 'Пользователь',
                avatarUrl: userMetadata.avatar_url || userMetadata.picture || null,
                email: user.email || 'Email не указан'
            });
        }
    }, [user]);

    if (!user || !userProfile) return null;

    const getInitials = (name: string): string => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className={styles.userSection}>
            <div className={styles.userInfo}>
                <div className={styles.avatar}>
                    {userProfile.avatarUrl ? (
                        <img 
                            src={userProfile.avatarUrl} 
                            alt={userProfile.displayName}
                            className={styles.avatarImage}
                        />
                    ) : (
                        <span className={styles.avatarFallback}>
                            {getInitials(userProfile.displayName)}
                        </span>
                    )}
                </div>
                <div className={styles.userDetails}>
                    <span className={styles.userName}>
                        {userProfile.displayName}
                    </span>
                    <span className={styles.userEmail}>
                        {userProfile.email}
                    </span>
                </div>
            </div>
            <button 
                className={styles.logoutBtn}
                onClick={signOut}
                title="Выйти из системы"
            >
                <LogOut size={16} />
                <span className={styles.logoutText}>Выйти</span>
            </button>
        </div>
    );
}
