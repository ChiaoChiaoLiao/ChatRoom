import * as actionTypes from './types';

export function addMessageAction(items) {
    return { type: actionTypes.ADD_MESSAGE, items: items };
}

export function changeNameAction(name) {
    return { type: actionTypes.CHANGE_NAME, value: name };
}

export function closeModalAction() {
    return { type: actionTypes.CLOSE_MODAL };
}