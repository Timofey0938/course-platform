// lib/services/course/courseQueries.ts
import { createClient } from '@/lib/supabase/client';
import type { Course, CourseCreateInput, CourseUpdateInput } from '@/lib/types';

export class CourseQueries {
    private supabase = createClient();

    /**
     * Базовые запросы к таблице courses
     */
    async selectAll(columns: string = '*') {
        return await this.supabase
            .from('courses')
            .select(columns)
            .order('created_at', { ascending: false });
    }

    async selectById(id: string, columns: string = '*') {
        return await this.supabase
            .from('courses')
            .select(columns)
            .eq('id', id)
            .single();
    }

    async selectBySlug(slug: string, columns: string = '*') {
        return await this.supabase
            .from('courses')
            .select(columns)
            .eq('slug', slug)
            .single();
    }

    async selectPublished(columns: string = '*') {
        return await this.supabase
            .from('courses')
            .select(columns)
            .eq('is_published', true)
            .order('order_index', { ascending: true })
            .order('created_at', { ascending: false });
    }

    /**
     * Мутации (insert, update, delete)
     */
    async insert(courseData: CourseCreateInput) {
        return await this.supabase
            .from('courses')
            .insert([{
                ...courseData,
                order_index: 0
            }])
            .select()
            .single();
    }

    async update(id: string, courseData: Partial<CourseUpdateInput>) {
        return await this.supabase
            .from('courses')
            .update({
                ...courseData,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();
    }

    async delete(id: string) {
        return await this.supabase
            .from('courses')
            .delete()
            .eq('id', id);
    }

    async togglePublish(id: string, isPublished: boolean) {
        return await this.supabase
            .from('courses')
            .update({ 
                is_published: isPublished,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();
    }
}
