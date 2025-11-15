// components/ProtectedRoute/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export function ProtectedRoute({ 
    children, 
    requireAdmin = false 
}: ProtectedRouteProps) {
    const { user, isLoading: authLoading } = useAuth();
    const { isAdmin, isLoading: roleLoading } = useUserRole();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !roleLoading) {
            if (!user) {
                router.push('/');
                return;
            }

            if (requireAdmin && !isAdmin) {
                router.push('/');
                return;
            }
        }
    }, [user, isAdmin, authLoading, roleLoading, requireAdmin, router]);

    if (authLoading || roleLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Проверка прав доступа...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Редирект уже произойдет в useEffect
    }

    if (requireAdmin && !isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-400 mb-4">
                        Доступ запрещен
                    </h1>
                    <p className="text-gray-400">
                        У вас недостаточно прав для доступа к этой странице.
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
