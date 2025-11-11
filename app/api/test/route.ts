// app/api/test/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .limit(1)

    if (error) {
      return NextResponse.json({ 
        success: false,
        error: error.message,
        hint: 'Check if courses table exists'
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: '✅ Supabase connection successful with new API!',
      data: data || 'No courses in database yet',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: error.message,
      hint: 'Check environment variables and API compatibility'
    }, { status: 500 })
  }
}