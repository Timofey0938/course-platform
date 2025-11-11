// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

export const createClient = () => {
    // На клиенте мы можем безопасно использовать process.env.NEXT_PUBLIC_ переменные
    // потому что они заменяются во время сборки
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase environment variables are not set:', {
            url: supabaseUrl,
            key: supabaseKey ? '***' : 'missing'
        });
        throw new Error(
            'Supabase configuration is missing. Please check your environment variables.'
        );
    }

    return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
