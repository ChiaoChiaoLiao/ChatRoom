import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import {addMessageToFirestore} from '../utils/firestore-utils';
import {isEmptyOrSpaces} from '../utils/functions';

class AddMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messageText: ""};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleAddMessageToFirestore = this.handleAddMessageToFirestore.bind(this);
    }
    handleTextChange(e) {
        this.setState({messageText: e.target.value});
    }
    handleKeyUp(e) {
        if (e.key === 'Enter' && !isEmptyOrSpaces(e.target.value)) {
            this.handleAddMessageToFirestore();
        }
    }
    handleAddMessageToFirestore() {
        const {username} = this.props;
        if (!isEmptyOrSpaces(this.state.messageText)) {
            addMessageToFirestore(username, this.state.messageText);
            this.setState({messageText: ""});
        }
    }
    render() {
        const {username} = this.props;
        var marginStyle = {
            margin: "5px"
        };
        return (
            <div>
              <MuiThemeProvider style={marginStyle}>
                <Avatar>{username.substring(0, 2).toUpperCase()}</Avatar>
              </MuiThemeProvider>
              <input type="text" style={marginStyle}
                     value={this.state.messageText}
                     onKeyUp={(e) => this.handleKeyUp(e)}
                     onChange={this.handleTextChange}/>
              <button style={marginStyle} onClick={this.handleAddMessageToFirestore}>Send</button>
            </div>
        );
    }
}

AddMessageForm.propTypes = {
    username: PropTypes.string
};

export default AddMessageForm;