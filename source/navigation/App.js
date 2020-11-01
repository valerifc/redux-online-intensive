// Core
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { hot } from 'react-hot-loader';

// ! react-redux connect должен быть внутри withRouter react-router-dom, иначе будет баг.
// withRouter нужен для решения проблемы конфликта компонентов Route с привязкой connect
// Функция connect под капотом содержит много оптимизаций. Но connect ничего не знает о Реакт Роутере, поэтому connect его как бы блокирует, не специально. Это баг. withRouter - это компонент высшего порядка в библиотеке Реакт Роутера - это встроенное решение.
// Без использования withRouter кнопки навигации NavLink (которые содержатся в компонентах Login, Signup, ..., отображение которых определяется свойством isAuthenticated, полученным благодаря connect) будут переключать роуты, но содержимое страницы меняться не будет.
// withRouter должен обертывать все приложение вместе с connect
// Подробнее: _Lectrum. Теория и практика\5. Маршрутизация в Redux\2. Практика. 1 часть\06:07...07:39

// Routes
import Private from './Private';
import Public from './Public';

// Components
import { Loading } from '../components';

// Actions
import { authActions } from '../bus/auth/actions';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.get('isAuthenticated'),
        isInitialized:   state.auth.get('isInitialized'),
    };
};

const mapDispatchToProps = {
    initializeAsync: authActions.initializeAsync,
};

@hot(module)
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    componentDidMount () {
        this.props.initializeAsync();
    }

    render () {
        const { isAuthenticated, isInitialized } = this.props;

        if (!isInitialized) {
            return <Loading />;
        }

        return isAuthenticated ? <Private /> :<Public />;
    }
}
