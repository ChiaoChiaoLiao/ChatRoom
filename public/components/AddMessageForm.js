import React from 'react';
import {AddMessageToFirestore} from '../utils/firestore-utils';
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
            AddMessageToFirestore(this.props.username, this.state.messageText);
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

export default AddMessageForm;