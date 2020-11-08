// Core
import { Map } from "immutable";

// Types
import { authReducer } from "../reducer";

// Actions
import { authActions } from "../actions";

const initialState = Map({
    isAuthenticated: false,
    isInitialized:   false,
});

describe('auth reducer:', () => {
    test('should return initial state by default', () => {

        /**
         * void в JS выполнит то, что справа и вернет undefined
         * void 0 равносильно undefined
         * Использование undefined в явном виде плохая практика.
         *
         * Второй аргумент в authReducer - экшн - пустой объект, чтобы дойти до дефолтного кейса.
         */
        expect(authReducer(void 0, {})).toEqual(initialState);
    });

    test('should handle AUTHENTICATE action', () => {
        expect(authReducer(void 0, authActions.authenticate()))
            .toEqual(initialState.set('isAuthenticated', true));
    });

    test('should handle INITIALIZE action', () => {
        expect(authReducer(void 0, authActions.initialize()))
            .toEqual(initialState.set('isInitialized', true));
    });

    test('should handle LOGOUT action', () => {
        expect(authReducer(void 0, authActions.logout()))
            .toEqual(initialState.set('isInitialized', false));
    });
});
