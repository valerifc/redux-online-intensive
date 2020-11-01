// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";

// Workers
import { fetchPost, createPost, removePost, likePost, unlikePost } from "./workers";

export function* watcherFetchPost () {
    yield takeEvery(types.FETCH_POSTS_ASYNC, fetchPost);
}

export function* watcherCreatePost () {
    yield takeEvery(types.CREATE_POST_ASYNC, createPost);
}

export function* watcherRemovePost () {
    yield takeEvery(types.REMOVE_POST_ASYNC, removePost);
}

export function* watcherLikePost () {
    yield takeEvery(types.LIKE_POST_ASYNC, likePost);
}

export function* watcherUnlikePost () {
    yield takeEvery(types.UNLIKE_POST_ASYNC, unlikePost);
}

// Промежуточная watcher-saga, собирающая в себя остальные watcher-saga'и этого домена.
export function* watchPosts () {
    yield all([
        call(watcherFetchPost),
        call(watcherCreatePost),
        call(watcherRemovePost),
        call(watcherLikePost),
        call(watcherUnlikePost)
    ]);
}
