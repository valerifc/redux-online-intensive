// Core
import { createStore } from 'redux';

// Roots
import { rootReducer } from './rootReducer';
import { rootSaga } from "./rootSaga";

// Enhancer
import { enchancedStore, sagaMiddleware } from "./middleware/core";

export const store = createStore(rootReducer, enchancedStore);

// Важный нюанс: sagaMiddleware.run(rootSaga) нужно делать именно после создания store.
sagaMiddleware.run(rootSaga);
