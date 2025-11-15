// lib/constants/ui.ts

// Классы CSS для состояний
export const UI_CLASSES = {
    ERROR: 'error',
    SUCCESS: 'success', 
    WARNING: 'warning',
    LOADING: 'loading',
    DISABLED: 'disabled'
} as const;

// Тексты для кнопок
export const BUTTON_TEXTS = {
    SAVE: 'Сохранить',
    CREATE: 'Создать',
    UPDATE: 'Обновить',
    DELETE: 'Удалить',
    CANCEL: 'Отмена',
    SUBMIT: 'Отправить',
    LOADING: 'Загрузка...',
    CREATING: 'Создание...',
    SAVING: 'Сохранение...'
} as const;

// Тексты для заголовков
export const TITLE_TEXTS = {
    CREATE_COURSE: 'Создание нового курса',
    EDIT_COURSE: 'Редактирование курса',
    COURSE_MANAGEMENT: 'Управление курсами',
    ADMIN_PANEL: 'Панель администратора'
} as const;

// Тексты для описаний
export const DESCRIPTION_TEXTS = {
    CREATE_COURSE: 'Заполните информацию о новом курсе',
    EDIT_COURSE: 'Внесите изменения в информацию о курсе', 
    COURSE_MANAGEMENT: 'Создавайте и редактируйте курсы платформы',
    ADMIN_PANEL: 'Управление контентом и настройками платформы'
} as const;

// Placeholder тексты
export const PLACEHOLDER_TEXTS = {
    COURSE_TITLE: 'Введите название курса',
    COURSE_SLUG: 'url-adres-kursa',
    COURSE_DESCRIPTION: 'Опишите, чему научатся студенты в этом курсе',
    COURSE_DURATION: 'Например: 2 часа, 4 недели',
    COURSE_COVER_URL: 'https://example.com/image.jpg'
} as const;

// Help тексты (подсказки под полями)
export const HELP_TEXTS = {
    COURSE_SLUG: 'Уникальный идентификатор для URL. Только латинские буквы, цифры и дефисы.',
    COURSE_PUBLISH: 'Если не отмечено, курс будет сохранен как черновик'
} as const;
