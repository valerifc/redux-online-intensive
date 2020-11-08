// Core
import { createStore, combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// Reducers
import { authReducer as auth } from '../../bus/auth/reducer';
import { uiReducer as ui } from '../../bus/ui/reducer';
import { postsReducer as posts } from '../../bus/posts/reducer';
import { profileReducer as profile } from '../../bus/profile/reducer';
import { usersReducer as users } from '../../bus/users/reducer';
import { formsReducer as forms } from '../../bus/forms/reducer';

// Store
import { store } from "../store";

export const referenceRootReducer = combineReducers({
    auth,
    ui,
    posts,
    profile,
    router,
    users,
    forms,
});

const referenceStore = createStore(referenceRootReducer);

describe('store:', () => {

    /**
     * С помощью такого теста мы защитим состояние всего приложения:
     * если кто-нибудь случайно удалит какой-нибудь из редьюсеров в root редьюсере,
     * то тест нам об этом сигнализирует.
     */
    test('should have valid state shape', () => {
        expect(store.getState()).toEqual(referenceStore.getState());
    });
});
