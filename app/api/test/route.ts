// app/api/test/route.ts
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = createAdminClient();
        
        // Простой тест подключения
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .limit(1);

        if (error) {
            return NextResponse.json({ 
                success: false,
                error: error.message,
                details: 'Supabase query failed'
            }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Supabase connection successful!',
            data: data || 'No courses yet',
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        return NextResponse.json({ 
            success: false,
            error: error.message,
            details: 'Check environment variables'
        }, { status: 500 });
    }
}
