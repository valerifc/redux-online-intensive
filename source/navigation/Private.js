// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { Feed, Profile, NewPassword } from '../pages';

// Instruments
import { book } from "./book";

// WebSocket
import { socket } from "../init/socket";

export default class Private extends Component {

    componentDidMount () {
        const { listenPosts } = this.props;

        listenPosts(); // Подписка.
    }

    componentWillUnmount () {
        socket.removeListener('create'); // Отписка.
    }

    render () {
        return (
            <Switch>
                <Route component = { Feed } path = { book.feed } />
                <Route component = { Profile } path = { book.profile } />
                <Route component = { NewPassword } path = { book.newPassword } />
                <Redirect to = { book.feed } />
            </Switch> // Switch рендерит первый компонент, для которого есть совпадение по path, а все компоненты, которые идут дальше - пропускает.
        );
    }
}
