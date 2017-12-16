var React = require('react');
var ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
class MessageItem extends React.Component {
    render() {
        var inlineStyle = {
            display: "inline-block",
            verticalAlign: "middle"
        }
        var userStyle = {
            margin: "0",
            marginLeft: "15px"
        }
        var messageStyle = {
            margin: "15px",
            marginTop: "7px"
        }

        return (
            <div>
                <MuiThemeProvider style={inlineStyle}>
                    <Avatar>A</Avatar>
                </MuiThemeProvider>
                <div style={inlineStyle}>
                    <h3 style={userStyle}>James Stuart</h3>
                    <h4 style={messageStyle}>Training Manager</h4>
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
            // return (<li key={item.id}>{item.data}</li>);
            return (<MessageItem key={item.id}>{item.data}</MessageItem>);
        });
        var scrollStyle = {
            overflow: "auto",
            height: "600px"
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
        this.handleAddMessageItem = this.handleAddMessageItem.bind(this);
    }
    handleTextChange(e) {
        this.setState({messageText: e.target.value});
    }
    handleAddMessageItem() {
        this.props.addItem(this.state.messageText);
        this.setState({messageText: ""});
    }
    render() {
        return (
            <div>
                <input type="text"
                       value={this.state.messageText}
                       onChange={this.handleTextChange}/>
                <button
                    onClick={this.handleAddMessageItem}>Send Message</button>
            </div>
        );
    }
}

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddMessageItem = this.handleAddMessageItem.bind(this);
        this.state = {
            messageItems: [
                {id: 1, data: "Item 1"},
                {id: 2, data: "Item 2"},
                {id: 3, data: "Item 2"},
                {id: 4, data: "Item 2"},
                {id: 5, data: "Item 2"},
                {id: 6, data: "Item 2"},
                {id: 7, data: "Item 2"},
                {id: 8, data: "Item 2"}
            ]
        }
    }
    handleAddMessageItem(text) {
        var items = this.state.messageItems;
        items.push({
            id: items.length + 1,
            data: text
        });
        this.setState({messageItems: items});
    }
    render() {
        return(
            <div className="messageList">
                <h1>Chatting Room</h1>
                <MessageList items={this.state.messageItems} id="messageList"/>
                <AddMessageForm addItem={this.handleAddMessageItem}/>
            </div>
        );
    }
}

ReactDOM.render(
    <ChatRoom />,
    document.getElementById("root")
);