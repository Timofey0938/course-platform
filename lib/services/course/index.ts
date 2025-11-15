// lib/services/course/index.ts
import { CourseService } from './CourseService';

// Создаем и экспортируем синглтон здесь
export const courseService = CourseService.getInstance();

// Реэкспортируем класс если понадобится
export { CourseService };
