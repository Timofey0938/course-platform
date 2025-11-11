// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

export const createAdminClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase environment variables are not set');
    }

    return createClient<Database>(supabaseUrl, supabaseKey);
}
