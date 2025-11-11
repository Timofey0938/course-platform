// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isConfigured: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfigured, setIsConfigured] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const supabase = createClient();
                
                // Проверяем что клиент рабочий
                if (!supabase.auth?.getUser) {
                    setIsConfigured(false);
                    setIsLoading(false);
                    return;
                }

                const {
                    data: { subscription },
                } = supabase.auth.onAuthStateChange((event, session) => {
                    setUser(session?.user ?? null);
                    setIsLoading(false);
                });

                // Получаем текущую сессию
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
                setIsLoading(false);

                return () => subscription.unsubscribe();
            } catch (error) {
                console.error('Auth initialization error:', error);
                setIsConfigured(false);
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            alert('Ошибка входа. Проверьте консоль для подробностей.');
        }
    };

    const signOut = async () => {
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoading, 
            isConfigured,
            signInWithGoogle, 
            signOut 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
