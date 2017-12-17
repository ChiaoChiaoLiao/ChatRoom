const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import {GetFirestore} from './utils/firebase-config.js';
import {AddMessageToFirestore} from './utils/firestore-utils.js';

const FirestoreDB = GetFirestore();
var userName = "";

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    handleTextChange(e) {
        userName = e.target.value;
        this.setState({name: e.target.value});
    }
    render() {
        if(!this.props.show) {
            return null;
        }
        var backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };
        var modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 250,
            margin: '0 auto',
            padding: 30
        };
        var contentStyle = {
            textAlign: "center"
        }
        var inputStyle = {
            margin: "10px"
        }
        var buttonStyle = {
            margin: "50px"
        }
        var hintStyle = {
            color: "#808080"
        }
        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    {this.props.children}
                    <div style={contentStyle}>
                        <h3>What's your name?</h3>
                        <input type="text"
                           style={inputStyle}
                           value={this.state.name}
                           onChange={this.handleTextChange}/>
                        <h6 style={hintStyle}>Hint: Your name cannot be empty.</h6>
                        <div className="footer" style={buttonStyle}>
                            <button onClick={this.props.onClose}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messageText: ""};
    }
    render() {
        var blockStyle = {
            margin: "10px"
        }
        var inlineStyle = {
            display: "inline-block",
            verticalAlign: "middle"
        }
        var textStyle = {
            margin: "0",
            marginLeft: "15px"
        }
        var timeStyle = {
            margin: "0",
            marginLeft: "15px",
            color: "#808080"
        }
        var timestamp = new Date(this.props.timestamp);
        var date = timestamp.getHours() + ":" + timestamp.getMinutes() + " "
                + timestamp.getFullYear() + "/" + (timestamp.getMonth()+1) + "/" + timestamp.getDate();
        return (
            <div style={blockStyle}>
                <MuiThemeProvider style={inlineStyle}>
                    <Avatar>{this.props.user.substring(0, 2).toUpperCase()}</Avatar>
                </MuiThemeProvider>
                <div style={inlineStyle}>
                    <h3 style={textStyle}>{this.props.user}</h3>
                    <h4 style={textStyle}>{this.props.content}</h4>
                    <h6 style={timeStyle}>{date}</h6>
                </div>
            </div>
        );
    }
}

class MessageList extends React.Component {
    componentDidUpdate() {
        var node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }
    render() {
        var displayItems = this.props.items.map(function (item) {
            return (<MessageItem key={item.id} content={item.data} user={item.user} timestamp={item.timestamp}/>);
        });
        var scrollStyle = {
            overflow: "auto",
            height: "600px",
            width: "50%"
        }
        return (
            <div style={scrollStyle}>
                <ul>{displayItems}</ul>
            </div>
        );
    }
}

class AddMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messageText: ""};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleAddMessageToFirestore = this.handleAddMessageToFirestore.bind(this);
    }
    handleTextChange(e) {
        if (event.key === 'Enter' && !isEmptyOrSpaces(e.target.value)) {
            this.handleAddMessageToFirestore();
        }
        this.setState({messageText: e.target.value});
    }
    handleKeyUp(e) {
        if (e.key === 'Enter' && !isEmptyOrSpaces(e.target.value)) {
            this.handleAddMessageToFirestore();
        }
    }
    handleAddMessageToFirestore() {
        if (!isEmptyOrSpaces(this.state.messageText)) {
            AddMessageToFirestore(userName, this.state.messageText);
            this.setState({messageText: ""});
        }
    }
    render() {
        return (
            <div>
                <input type="text"
                       value={this.state.messageText}
                       onKeyUp={(e) => this.handleKeyUp(e)}
                       onChange={this.handleTextChange}/>
                <button
                    onClick={this.handleAddMessageToFirestore}>Send</button>
            </div>
        );
    }
}

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddMessageItem = this.handleAddMessageItem.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            messageItems: [],
            isOpen: true
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
    toggleModal() {
        console.log("toggle  " + userName);
        if (isEmptyOrSpaces(userName)) {
            return;
        }
        ListenToFirestore(this);
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        var lineStyle = {
            width: "50%",
            marginLeft: "0"
        }
        return(
            <div className="messageList">
                <h1>Chatting Room</h1>
                <Modal show={this.state.isOpen} onClose={this.toggleModal}></Modal>
                <MessageList items={this.state.messageItems} id="messageList"/>
                <hr style={lineStyle}/>
                <AddMessageForm/>
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

ReactDOM.render(
    <ChatRoom />,
    document.getElementById("root")
);