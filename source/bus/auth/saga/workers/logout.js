// Core
import { put, apply } from "redux-saga/effects";
import { replace } from "react-router-redux";
import { actions } from "react-redux-form";

// Instruments
import { api } from "../../../../REST";
import { authActions } from "../../actions";
import { uiActions } from "../../../ui/actions";
import { profileActions } from "../../../profile/actions";
import { postsActions } from "../../../posts/actions";
import { usersActions } from "../../../users/actions";
import { book } from "../../../../navigation/book";

export function* logout () {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.auth.logout);

        if (response.status !== 204) { // Для логаута статус код успешной операции - 204, а не 200.
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }

        /**
         * Если запрос выполнен успешно, сервер никакого ответа не присылает.
         * Если произошла какая-либо ошибка и статус-код не 204, то сервер пришлет ответ с полем message с сообщением о том, что пошло не так.
         *
         * Логаут - это особенная операция, при выполнении которой нужно делать зачистки разных частей состояния приложения.
         */
    } catch (error) {
        yield put(uiActions.emitError(error, 'logout worker'));
    } finally {
        yield apply(localStorage, localStorage.removeItem, ['token']);
        yield apply(localStorage, localStorage.removeItem, ['remember']);
        yield put(profileActions.clearProfile());
        yield put(postsActions.clearPost());
        yield put(usersActions.clearUsers());
        yield put(uiActions.stopFetching());
        yield put(actions.reset('forms.user')); // Возвращаем состояние модели user к изначальному.
        yield put(authActions.logout());
        yield put(replace(book.login));
    }
}
