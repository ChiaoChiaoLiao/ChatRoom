import React from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './components/ChatRoom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reducer} from './reducers/reducers'

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <ChatRoom />
    </Provider>,
    document.getElementById("root")
);