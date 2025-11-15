// app/admin/courses/hooks/useCoursesList.ts
import { useState, useEffect } from 'react';
import { courseService } from '@/lib/services';
import type { Course } from '@/lib/types';

export interface UseCoursesListReturn {
    courses: Course[];
    isLoading: boolean;
    error: string | null;
    refreshCourses: () => Promise<void>;
    deleteCourse: (courseId: string) => Promise<boolean>;
}

export const useCoursesList = (): UseCoursesListReturn => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCourses = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await courseService.getCourses();
            
            if (result.success && result.data) {
                setCourses(result.data);
            } else {
                setError(result.error || 'Не удалось загрузить курсы');
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Произошла непредвиденная ошибка');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCourse = async (courseId: string): Promise<boolean> => {
        try {
            const result = await courseService.deleteCourse(courseId);
            
            if (result.success) {
                setCourses(prev => prev.filter(course => course.id !== courseId));
                return true;
            } else {
                setError(result.error || 'Не удалось удалить курс');
                return false;
            }
        } catch (err) {
            console.error('Error deleting course:', err);
            setError('Произошла непредвиденная ошибка при удалении');
            return false;
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return {
        courses,
        isLoading,
        error,
        refreshCourses: fetchCourses,
        deleteCourse
    };
};
