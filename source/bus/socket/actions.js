// Actions
import { socket } from "../../init/socket";
import { uiActions } from "../ui/actions";
import { postsActions } from "../posts/actions";

/**
 * @info В случае с сокетом будем использовать наш кастомный написанный ранее thunk middleware.
 * В обработке события веб сокета нам нужно будет запускать экшны.
 * Но логика обработки будет очень простая, поэтому thunk'и для этого подходят идеально.
 */
export const socketActions = {

    // Опишем первый обработчик события веб сокет.
    listenConnection: () => (dispatch) => {

        /**
         * Прослушиваем событие connect (первый аргумент on).
         * Это событие сработает в момент, когда веб сокет обнаружит наличие интернета.
         * Обработчик события веб сокета (второй аргумент on).
         */
        socket.on('connect', () => {
            dispatch(uiActions.setOnlineState());
        });

        socket.on('disconnect', () => {
            dispatch(uiActions.setOfflineState());
        });
    },

    listenPosts: () => (dispatch, getState) => {
        socket.on('create', (event) => {
            const { data: post } = JSON.parse(event);

            dispatch(postsActions.createPost(post));
        });

        socket.on("remove", (event) => {
            const { data: postId } = JSON.parse(event);

            dispatch(postsActions.removePost(postId));
        });

        socket.on('like', (event) => {
            const { data, meta } = JSON.parse(event);

            if (meta.action === 'like') {
                const liker = getState()
                    .users.find((user) => user.get('id') === data.userId)
                    .delete('avatar');

                dispatch(postsActions.likePost({
                    postId: data.postId,
                    liker,
                }));
            } else {
                dispatch(postsActions.unlikePost(data));
            }
        });
    },
};
