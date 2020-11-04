// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { authActions } from "../../actions";

export function* initialize () {
    const token = yield apply(localStorage, localStorage.getItem, ['token']);
    const remember = yield apply(localStorage, localStorage.getItem, ['remember']);

    /**
     * token === true - пользователь уже залогинился на сайте хотя бы 1 раз
     * remember === true - пользователь в момент логина выбрал чекбокс "Запомнить меня"
     */
    if (token && remember) {
        yield put(authActions.authenticateAsync());
    } else {
        yield put(authActions.initialize());
    }
}
