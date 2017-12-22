import React from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './components/ChatRoom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {changeText} from './components/Modal';

const rootReducer = combineReducers({
    changeText
});

const  store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
      <ChatRoom />
    </Provider>,
    document.getElementById("root")
);