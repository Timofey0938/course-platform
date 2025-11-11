// components/UserMenu/UserMenu.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import styles from './UserMenu.module.scss';

export function UserMenu() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <div className={styles.userMenu}>
            <div className={styles.userInfo}>
                <User className={styles.userIcon} />
                <span className={styles.userName}>
                    {user.email?.split('@')[0]}
                </span>
            </div>
            <button onClick={signOut} className={styles.logoutBtn}>
                <LogOut size={16} />
                Выйти
            </button>
        </div>
    );
}
