// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";

// Workers
import { signup, login, authenticate, initialize, logout } from "./workers";

export function* watchSignup () {
    yield takeEvery(types.SIGNUP_ASYNC, signup);
}

export function* watchLogin () {
    yield takeEvery(types.LOGIN_ASYNC, login);
}

export function* watchAuthenticate () {
    yield takeEvery(types.AUTHENTICATE_ASYNC, authenticate);
}

export function* watchIitialize () {
    yield takeEvery(types.INITIALIZE_ASYNC, initialize);
}

export function* watchLogout () {
    yield takeEvery(types.LOGOUT_ASYNC, logout);
}

export function* watchAuth () {
    yield all([
        call(watchSignup),
        call(watchLogin),
        call(watchAuthenticate),
        call(watchIitialize),
        call(watchLogout)
    ]);
}
