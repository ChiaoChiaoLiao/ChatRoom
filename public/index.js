import React from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './components/ChatRoom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

function reducer(state = {username: "", isOpen: true}, action) {
    switch(action.type) {
        case 'CHANGE_NAME':
            return {
                username: action.value,
                isOpen: state.isOpen
            };
        case 'CLOSE':
            return {
                username: state.username,
                isOpen: false
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <ChatRoom />
    </Provider>,
    document.getElementById("root")
);