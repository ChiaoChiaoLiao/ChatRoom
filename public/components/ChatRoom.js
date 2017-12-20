import React from 'react';
import Modal from './Modal.js';
import MessageList from './MessageList';
import AddMessageForm from './AddMessageForm';
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
            messageItems: [],
            isOpen: true,
            username: ""
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
    getUsername(name){
        this.setState({username: name});
    }
    toggleModal() {
        console.log("toggle  " + this.state.username);
        if (isEmptyOrSpaces(this.state.username)) {
            return;
        }
        ListenToFirestore(this);
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        if (this.state.isOpen) {
            return (
                <div className="chatRoom">
                    <h1>Chatting Room</h1>
                    <Modal show={this.state.isOpen} onClose={this.toggleModal} setUsername={this.getUsername}/>
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
                <AddMessageForm username={this.state.username}/>
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

export default ChatRoom;