export const types = {
    // Sync
    AUTHENTICATE: 'AUTHENTICATE', // Для редьюсера. Для изменения состояния аутентификации.
    //// LOGIN:        'LOGIN',
    INITIALIZE:   'INITIALIZE',
    LOGOUT:       'LOGOUT',

    // Async
    SIGNUP_ASYNC:       'SIGNUP_ASYNC',
    // Для Redux Saga. Для регистрации нового пользователя.
    // Данные о пользователе будут отправляться на сервер для регистрации нового пользователя.
    LOGIN_ASYNC:        'LOGIN_ASYNC',
    AUTHENTICATE_ASYNC: 'AUTHENTICATE_ASYNC',
    INITIALIZE_ASYNC:   'INITIALIZE_ASYNC',
    LOGOUT_ASYNC:       'LOGOUT_ASYNC',
};
