// Core
import { combineForms } from 'react-redux-form';

/**
 * @info
 * Первый аргумент - объект, содержащий модели всех глобальных форм приложения
 * (в нашем случае это модель профиля пользователя).
 * Второй аргумент - ключ, по которому будет происходить поиск всех моделей форм.
 */
export const formsReducer = combineForms(
    {
        user: {
            profile: {
                firstName: '',
                lastName:  '',
                avatar:    [],
            },
        },
    },
    'forms'
);
