// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";

// Workers
import { fetchPost, createPost, removePost } from "./workers";

export function* watcherFetchPost () {
    yield takeEvery(types.FETCH_POSTS_ASYNC, fetchPost);
}

export function* watcherCreatePost () {
    yield takeEvery(types.CREATE_POST_ASYNC, createPost);
}

export function* watcherRemovePost () {
    yield takeEvery(types.REMOVE_POST_ASYNC, removePost);
}

// Промежуточная watcher-saga, собирающая в себя остальные watcher-saga'и этого домена.
export function* watchPosts () {
    yield all([
        call(watcherFetchPost),
        call(watcherCreatePost),
        call(watcherRemovePost)
    ]);
}
