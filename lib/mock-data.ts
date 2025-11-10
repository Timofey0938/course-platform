export interface Course {
    id: string;
    title: string;
    description: string;
    slug: string;
    coverImage: string;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
}
  
export const mockCourses: Course[] = [
    {
        id: '1',
        title: 'История интернета',
        description: 'От ARPANET до современного веба: как развивалась глобальная сеть и какие технологии меняли наш способ общения.',
        slug: 'internet-history',
        coverImage: '/api/placeholder/400/250?text=Internet+History',
        duration: '2 часа',
        level: 'beginner',
    },
    {
        id: '2', 
        title: 'Процесс рендеринга страницы в браузере',
        description: 'Разбираемся как браузер превращает HTML, CSS и JavaScript в пиксели на экране. Критический путь рендеринга и оптимизации.',
        slug: 'browser-rendering',
        coverImage: '/api/placeholder/400/250?text=Browser+Rendering',
        duration: '3 часа',
        level: 'intermediate',
    },
    {
        id: '3',
        title: 'Как движок парсит JavaScript',
        description: 'Лексемы, AST, байт-код и JIT-компиляция. Погружаемся в внутренности JavaScript движков V8 и SpiderMonkey.',
        slug: 'javascript-parsing',
        coverImage: '/api/placeholder/400/250?text=JS+Parsing',
        duration: '4 часа',
        level: 'advanced',
    },
];
