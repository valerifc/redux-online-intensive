// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { authActions } from "../../actions";
import { uiActions } from "../../../ui/actions";
import { profileActions } from "../../../profile/actions";

export function* login ({ payload: credentials }) {
    try {
        yield put(uiActions.startFetching());

        console.log('→ credentials', credentials);

        const response = yield apply(api, api.auth.login, [credentials]);
        const { data: profile, message } = yield apply(response, response.json);

        console.log('→ profile', profile);

        if (response.status !== 200) {
            throw new Error(message);
        }

        if (credentials.remember) {
            yield apply(localStorage, localStorage.setItem, ['remember', true]);
        }

        // localStorage.setItem('token', profile.token); // Можно и так.
        // Но поскольку мы в полной мере используем эффекты Redux Saga, лучше так:
        yield apply(localStorage, localStorage.setItem, ['token', profile.token]);

        yield put(profileActions.fillProfile(profile));
        yield put(authActions.authenticate());
    } catch (error) {
        yield put(uiActions.emitError(error, 'login worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
