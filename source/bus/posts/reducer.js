// Core
import { fromJS, List } from "immutable";
// fromJS - метод конвертации обычного JS в коллекцию immutable JS.

// Types
import { types } from "./types";

const initialState = List();

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_POSTS:
            return fromJS(action.payload);

        case types.CREATE_POST:
            return state.unshift(fromJS(action.payload));

        case types.CLEAR_POST:
            return state.clear();

        case types.REMOVE_POST:
            return state.filter((post) => post.get('id') !== action.payload);

        case types.LIKE_POST:
            return state.updateIn(
                [
                    state.findIndex((post) => {
                        return post.get('id') === action.payload.postId;
                    }),
                    'likes'
                ],
                (likes) => {
                    return likes.unshift(action.payload.liker);
                    // Добавляем immutable Map с лайкером в начало списка likes.
                });
            // updateIn([index, property], updateFunction)
            // Первый аргумент updateIn - адрес свойства, которое нужно обновить.
            // Первый аргумент updateIn - это массив, в котором каждый аргумент это часть адреса свойства, которое нужно найти.
            // Мы обновляем список - индексированную коллекцию. Поэтому первым элементом для массива будет индекс лайкнутого поста.
            // Первый элемент массива первого аргумента updateIn найдет нам индекс лайкнутого поста.
            // Второй элемент массива первого аргумента updateIn - свойство лайкнутого поста, которое мы обновим вторым аргументом метода updateIn - функцией обновлятором.
            // Второй аргумент updateIn - функция, обновляющая свойство, которое будет найдено первым аргументом.

        case types.UNLIKE_POST:
            return state.updateIn(
                [
                    state.findIndex((post) => {
                        return post.get('id') === action.payload.postId;
                    }),
                    'likes'
                ],
                (likes) => {
                    return likes.filter((like) => like.id !== action.payload.likerId);
                });

        default: return state;
    }
};
