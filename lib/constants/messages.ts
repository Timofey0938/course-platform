// lib/constants/messages.ts

// Сообщения об успехе
export const SUCCESS_MESSAGES = {
    COURSE_CREATED: 'Курс успешно создан',
    COURSE_UPDATED: 'Курс успешно обновлен', 
    COURSE_DELETED: 'Курс успешно удален',
    COURSE_PUBLISHED: 'Курс опубликован',
    COURSE_UNPUBLISHED: 'Курс снят с публикации'
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
    // Общие ошибки
    UNEXPECTED_ERROR: 'Произошла непредвиденная ошибка',
    NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету',
    
    // Ошибки курсов
    COURSE_CREATE_FAILED: 'Ошибка при создании курса',
    COURSE_UPDATE_FAILED: 'Ошибка при обновлении курса',
    COURSE_DELETE_FAILED: 'Ошибка при удалении курса',
    COURSE_NOT_FOUND: 'Курс не найден',
    COURSE_LOAD_FAILED: 'Ошибка загрузки курсов',
    
    // Ошибки авторизации
    UNAUTHORIZED: 'Необходима авторизация',
    FORBIDDEN: 'Недостаточно прав для выполнения действия',
    
    // Ошибки валидации
    VALIDATION_FAILED: 'Ошибка валидации данных'
} as const;

// Сообщения подтверждений
export const CONFIRM_MESSAGES = {
    DELETE_COURSE: 'Вы уверены, что хотите удалить этот курс?',
    UNPUBLISH_COURSE: 'Вы уверены, что хотите снять курс с публикации?'
} as const;

// Сообщения для пустых состояний
export const EMPTY_STATE_MESSAGES = {
    NO_COURSES: {
        TITLE: 'Курсов пока нет',
        DESCRIPTION: 'Создайте первый курс чтобы начать',
        ACTION: 'Создать курс'
    },
    NO_PUBLISHED_COURSES: {
        TITLE: 'Публичных курсов пока нет',
        DESCRIPTION: 'Опубликуйте курсы чтобы они были видны пользователям'
    }
} as const;
