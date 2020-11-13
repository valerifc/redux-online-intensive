// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { Login, Signup } from '../pages';

// Instruments
import { book } from "./book";

export default class Public extends Component {
    render () {
        return (
            <Switch>
                <Route component = { Login } path = { book.login } />
                <Route component = { Signup } path = { book.signUp } />
                <Redirect to = { book.login } />
            </Switch> // Switch рендерит первый компонент, для которого есть совпадение по path, а все компоненты, которые идут дальше - пропускает.
        );
    }
}
