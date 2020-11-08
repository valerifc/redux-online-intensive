// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";

// Workers
import { updateName, updatePassword, updateAvatar } from "./workers";

export function* watchUpdateName () {
    yield takeEvery(types.UPDATE_NAME_ASYNC, updateName);
}
export function* watchUpdatePassword () {
    yield takeEvery(types.UPDATE_PASSWORD_ASYNC, updatePassword);
}
export function* watchUpdateAvatar () {
    yield takeEvery(types.UPDATE_AVATAR_ASYNC, updateAvatar);
}

export function* watchProfile () {
    yield all([call(watchUpdateName), call(watchUpdatePassword), call(watchUpdateAvatar)]);
}
