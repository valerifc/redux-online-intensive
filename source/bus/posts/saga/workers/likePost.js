// Core
import { put, apply, select } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { postsActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* likePost ({ payload: postId }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.posts.like, [postId]);

        console.log('→ likePost response', response);

        if (response.status !== 204) {
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }

        // У redux-thunk для получения профиля из состояния приложения использовался бы второй аргумент thunk функции - getState.
        // В саге генератора такой возможности нет, но есть эффект select, предназначение которого такое же, как и у getState - получить состояние приложения.
        // select принимает селектор в качестве аргумента:
        const liker = yield select((state) => {
            return state.profile.removeAll(['avatar', 'token']); // То же самое: .remove('avatar').remove('token'); // Для лайка нужны только ид поста, имя и фамилия.
        });

        console.log('→ likePost liker', liker);

        yield put(postsActions.likePost({ liker, postId }));
    } catch (error) {
        yield put(uiActions.emitError(error, 'likePost worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
