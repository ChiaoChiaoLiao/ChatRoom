import React from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './components/ChatRoom';
import {createStore} from 'redux';
import {changeText} from './components/Modal';
import {Provider} from 'react-redux';

const  store = createStore(changeText);

ReactDOM.render(
    <Provider store={store}>
        <ChatRoom />
    </Provider>,
    document.getElementById("root")
);