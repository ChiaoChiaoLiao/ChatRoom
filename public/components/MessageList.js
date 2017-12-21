import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

class MessageItem extends React.Component {
    render() {
        var blockStyle = {
            margin: "10px"
        };
        var inlineStyle = {
            display: "inline-block",
            verticalAlign: "middle"
        };
        var textStyle = {
            margin: "0",
            marginLeft: "15px"
        };
        var timeStyle = {
            margin: "0",
            marginLeft: "15px",
            color: "#808080"
        };
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
        };
        return (
            <div style={scrollStyle}>
                <ul>{displayItems}</ul>
            </div>
        );
    }
}
                                                
export default MessageList;