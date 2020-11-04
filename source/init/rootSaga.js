// Core
import { all, call } from "redux-saga/effects";

// Watchers
import { watchAuth } from "../bus/auth/saga/watchers";
import { watchPosts } from "../bus/posts/saga/watchers";
import { watchUsers } from "../bus/users/saga/watchers";

export function* rootSaga () {

    /** Теоретически, можно было бы обойтись без эффектов all, call:
     * <code>
     *     yield watchPosts();
     * </code>
     * Но с ними Root Saga становится расширяемой и более правильной с точки зрения использования эффектов.
     *
     * Теоретически, можно было бы обойтись без эффекта all в redux-online-intensive\source\bus\posts\saga\watchers.js:
     * <code>
     *     import { watcherCreatePost } from "../bus/posts/saga/watchers";
     *     export function* rootSaga () {
     *         yield watcherCreatePost();
     *     }
     * </code>
     * Но тогда импортов будет существенно больше, а также тело генератора rootSaga будет длиннее.
     */
    yield all([call(watchPosts), call(watchAuth), call(watchUsers)]);
}
