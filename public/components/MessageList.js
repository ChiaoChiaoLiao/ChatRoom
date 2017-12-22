import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

class MessageItem extends React.Component {
    render() {
        const {timestamp, user, content} = this.props;
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
        var timestampDate = new Date(timestamp);
        var date = timestampDate.getHours() + ":" + timestampDate.getMinutes() + " "
                + timestampDate.getFullYear() + "/" + (timestampDate.getMonth()+1) + "/" + timestampDate.getDate();
        return (
            <div style={blockStyle}>
                <MuiThemeProvider style={inlineStyle}>
                    <Avatar>{user.substring(0, 2).toUpperCase()}</Avatar>
                </MuiThemeProvider>
                <div style={inlineStyle}>
                    <h3 style={textStyle}>{user}</h3>
                    <h4 style={textStyle}>{content}</h4>
                    <h6 style={timeStyle}>{date}</h6>
                </div>
            </div>
        );
    }
}

MessageItem.propTypes = {
    timestamp: PropTypes.number,
    user: PropTypes.string,
    content: PropTypes.string
};

class MessageList extends React.Component {
    componentDidUpdate() {
        var node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }
    render() {
        const {items} = this.props;
        var displayItems = items.map(function (item) {
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

MessageList.propTypes = {
    items: PropTypes.array
};
                                                
export default MessageList;