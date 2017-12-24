import React from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';
import MessageList from './MessageList';
import AddMessageForm from './AddMessageForm';
import {connect} from 'react-redux';
import {getFirestore} from '../utils/firebase-config';
import {isEmptyOrSpaces} from '../utils/functions';
import {addMessageAction, changeNameAction, closeModalAction} from '../actions/actions';

const FirestoreDB = getFirestore();

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.getUsername = this.getUsername.bind(this);
    }
    handleAddMessageItem(Comp, snapshot) {
        console.log("add item snapshot ", snapshot);

        var items = [];
        snapshot.forEach(function(doc) {
            items.push({
                id: doc.id,
                data: doc.data().message,
                user: doc.data().name,
                timestamp: doc.data().timestamp
            });
        });
        Comp.props.dispatch(addMessageAction(items));
    }
    getUsername(e){
        this.props.dispatch(changeNameAction(e.target.value));
    }
    toggleModal() {
        console.log("toggle  " + this.props.username);
        if (isEmptyOrSpaces(this.props.username)) {
            return;
        }
        this.listenToFirestore(this);
        this.props.dispatch(closeModalAction());
    }
    listenToFirestore(Comp) {
        FirestoreDB.where("timestamp", ">", 0)
        .onSnapshot(function(querySnapshot) {
            console.log("listen to firestore");
            ChatRoom.prototype.handleAddMessageItem(Comp, querySnapshot);
        });
    }
    render() {
        if (this.props.isOpen) {
            return (
                <div className="chatRoom">
                  <h1>Chatting Room</h1>
                  <Modal show={this.props.isOpen} onClose={this.toggleModal} setUsername={this.getUsername}/>
                </div>
            );
        }
        var lineStyle = {
            width: "50%",
            marginLeft: "0"
        };
        return(
            <div className="chatRoom">
              <h1>Chatting Room</h1>
              <MessageList items={this.props.messageItems} id="messageList"/>
              <hr style={lineStyle}/>
              <AddMessageForm username={this.props.username}/>
            </div>
        );
    }
}

ChatRoom.propTypes = {
    username: PropTypes.string,
    isOpen: PropTypes.bool,
    messageItems: PropTypes.array
}

function mapStateToProps(state) {
    return {
        username: state.username,
        isOpen: state.isOpen,
        messageItems: state.messageItems
    };
}

export default connect(mapStateToProps)(ChatRoom);