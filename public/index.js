import React from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './components/ChatRoom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

function reducer(state = {username: "", isOpen: true, messageItems:[]}, action) {
    switch(action.type) {
        case 'CHANGE_NAME':
            return {
                username: action.value,
                isOpen: state.isOpen,
                messageItems: state.messageItems
            };
        case 'CLOSE':
            return {
                username: state.username,
                isOpen: false,
                messageItems: state.messageItems
            };
        case 'ADD_MESSAGE':
            return {
                username: state.username,
                isOpen: state.isOpen,
                messageItems: action.items
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