import React from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';
import MessageList from './MessageList';
import AddMessageForm from './AddMessageForm';
import {connect} from 'react-redux';
import {GetFirestore} from '../utils/firebase-config';
import {isEmptyOrSpaces} from '../utils/functions';

const FirestoreDB = GetFirestore();

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddMessageItem = this.handleAddMessageItem.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.state = {
            messageItems: []
        }
    }
    handleAddMessageItem(classThis, snapshot, items) {
        console.log("add item snapshot ", snapshot);

        snapshot.forEach(function(doc) {
            items.push({
                id: doc.id,
                data: doc.data().message,
                user: doc.data().name,
                timestamp: doc.data().timestamp
            });
        });
        classThis.setState({messageItems: items});
    }
    getUsername(e){
        this.props.dispatch({ type: 'CHANGE_NAME', value: e.target.value });
    }
    toggleModal() {
        console.log("toggle  " + this.props.username);
        if (isEmptyOrSpaces(this.props.username)) {
            return;
        }
        ListenToFirestore(this);
        this.props.dispatch({ type: 'CLOSE' });
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
              <MessageList items={this.state.messageItems} id="messageList"/>
              <hr style={lineStyle}/>
              <AddMessageForm username={this.props.username}/>
            </div>
        );
    }
}

function ListenToFirestore(classThis) {
    FirestoreDB.where("timestamp", ">", 0)
    .onSnapshot(function(querySnapshot) {
        console.log("listen to firestore");
        ChatRoom.prototype.handleAddMessageItem(classThis, querySnapshot, []);
    });
}

ChatRoom.propTypes = {
    username: PropTypes.string,
    isOpen: PropTypes.bool
}

function mapStateToProps(state) {
    return {
        username: state.username,
        isOpen: state.isOpen
    };
}

export default connect(mapStateToProps)(ChatRoom);