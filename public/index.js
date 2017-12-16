var React = require('react');
var ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messageText: ""};
    }
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
                    <Avatar>{this.props.user.charAt(0)}</Avatar>
                </MuiThemeProvider>
                <div style={inlineStyle}>
                    <h3 style={userStyle}>{this.props.user}</h3>
                    <h4 style={messageStyle}>{this.props.content}</h4>
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
            return (<MessageItem key={item.id} content={item.data} user={item.user}/>);
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
        this.handleAddMessageItem = this.handleAddMessageItem.bind(this);
    }
    handleTextChange(e) {
        if (event.key === 'Enter') {
            this.handleAddMessageItem();
        }
        this.setState({messageText: e.target.value});
    }
    handleKeyUp(e) {
        if (e.key === 'Enter') {
            this.handleAddMessageItem();
        }
    }
    handleAddMessageItem() {
        this.props.addItem(this.state.messageText);
        this.setState({messageText: ""});
    }
    render() {
        var submitStyle = {
            marginTop: "15px"
        }
        return (
            <div>
                <input type="text"
                       value={this.state.messageText}
                       onKeyUp={(e) => this.handleKeyUp(e)}
                       onChange={this.handleTextChange}/>
                <button
                    onClick={this.handleAddMessageItem}>Submit</button>
            </div>
        );
    }
}

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddMessageItem = this.handleAddMessageItem.bind(this);
        this.state = {
            messageItems: []
        }
    }
    handleAddMessageItem(text) {
        var items = this.state.messageItems;
        items.push({
            id: items.length + 1,
            data: text,
            user: "ABC"
        });
        this.setState({messageItems: items});
    }
    render() {
        var lineStyle = {
            width: "50%",
            marginLeft: "0"
        }
        return(
            <div className="messageList">
                <h1>Chatting Room</h1>
                <MessageList items={this.state.messageItems} id="messageList"/>
                <hr style={lineStyle}/>
                <AddMessageForm addItem={this.handleAddMessageItem}/>
            </div>
        );
    }
}

ReactDOM.render(
    <ChatRoom />,
    document.getElementById("root")
);