// Core
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { hot } from 'react-hot-loader';

// Routes
import Private from './Private';
import Public from './Public';

// Components
import { Loading } from '../components';

// Actions
import { authActions } from '../bus/auth/actions';
import { socketActions } from '../bus/socket/actions';

// Websocket
import { socket, joinSocketChannel } from '../init/socket';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.get('isAuthenticated'),
        isInitialized:   state.auth.get('isInitialized'),
    };
};

const mapDispatchToProps = {
    initializeAsync: authActions.initializeAsync,
    ...socketActions,
};

/**
 * @info react-redux connect должен быть внутри withRouter react-router-dom, иначе будет баг.
 * withRouter нужен для решения проблемы конфликта компонентов Route с привязкой connect
 * Функция connect под капотом содержит много оптимизаций. Но connect ничего не знает о Реакт Роутере, поэтому connect его как бы блокирует, не специально. Это баг. withRouter - это компонент высшего порядка в библиотеке Реакт Роутера - это встроенное решение.
 * Без использования withRouter кнопки навигации NavLink (которые содержатся в компонентах Login, Signup, ..., отображение которых определяется свойством isAuthenticated, полученным благодаря connect) будут переключать роуты, но содержимое страницы меняться не будет.
 * withRouter должен обертывать все приложение вместе с connect
 * Подробнее: _Lectrum. Теория и практика\5. Маршрутизация в Redux\2. Практика. 1 часть\06:07...07:39
 */
@hot(module)
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    componentDidMount () {
        const { initializeAsync, listenConnection } = this.props;

        initializeAsync();
        listenConnection();
        joinSocketChannel(); // Инициализация веб сокета.
    }

    componentWillUnmount () {

        /**
         * Отписка. Ведь подписки всегда нужно очищать,
         * то есть отписываться от них тогда, когда они больше не нужны.
         * Иначе подписки будут храниться в памяти и загружать приложение и даже иногда его сломать.
         */
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    render () {
        const { isAuthenticated, isInitialized, listenPosts } = this.props;

        if (!isInitialized) {
            return <Loading />;
        }

        return isAuthenticated

            /**
             * Подписака на создание поста приватная.
             * Событие на создание нового поста может прослушивать только тот пользователь, у которого есть доступ к стене, т.е. залогиненный пользователь.
             * Остальным пользователям подписка на создание поста не нужна. Поэтому будем подписываться на событие create только в компоненте Private.
             * В компоненте App мы привязываем все экшны socketActions к dispatch, поэтому передаем экшн listenPosts компоненту Private через props.
             * Подписку и отписку на create сделаем в методах жизненного цикла компонента Private.
             */
            ? <Private listenPosts = { listenPosts } />
            : <Public />;
    }
}
