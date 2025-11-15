// hooks/useUserRole.ts
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

interface UserProfile {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    role: string;
}

interface UserRole {
    isAdmin: boolean;
    isLoading: boolean;
    userProfile: UserProfile | null;
}

export function useUserRole(): UserRole {
    const { user } = useAuth();
    const [userRole, setUserRole] = useState<UserRole>({ 
        isAdmin: false, 
        isLoading: true,
        userProfile: null
    });

    useEffect(() => {
        const checkUserRole = async () => {
            if (!user) {
                setUserRole({ isAdmin: false, isLoading: false, userProfile: null });
                return;
            }

            try {
                const supabase = createClient();
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching user role:', error);
                    setUserRole({ isAdmin: false, isLoading: false, userProfile: null });
                    return;
                }

                setUserRole({ 
                    isAdmin: profile?.role === 'admin', 
                    isLoading: false,
                    userProfile: profile
                });
            } catch (error) {
                console.error('Error checking user role:', error);
                setUserRole({ isAdmin: false, isLoading: false, userProfile: null });
            }
        };

        checkUserRole();
    }, [user]);

    return userRole;
}
