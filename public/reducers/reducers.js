import * as actionTypes from '../actions/types';

export function reducer(state = {username: "", isOpen: true, messageItems:[]}, action) {
    switch(action.type) {
        case actionTypes.CHANGE_NAME:
            return {
                username: action.value,
                isOpen: state.isOpen,
                messageItems: state.messageItems
            };
        case actionTypes.CLOSE_MODAL:
            return {
                username: state.username,
                isOpen: false,
                messageItems: state.messageItems
            };
        case actionTypes.ADD_MESSAGE:
            return {
                username: state.username,
                isOpen: state.isOpen,
                messageItems: action.items
            };
        default:
            return state;
    }
}