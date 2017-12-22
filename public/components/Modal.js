import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Modal extends React.Component {
    render() {
        const {onClose, show, children, username, handleTextChange, setUsername} = this.props;
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
        };
        var inputStyle = {
            margin: "10px"
        };
        var buttonStyle = {
            margin: "50px"
        };
        var hintStyle = {
            color: "#808080"
        };
        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    {children}
                    <div style={contentStyle}>
                        <h3>What's your name?</h3>
                        <input type="text"
                           style={inputStyle}
                           value={username}
                           onChange={(e) => {handleTextChange(e); setUsername(e);}}/>
                        <h6 style={hintStyle}>Hint: Your name cannot be empty.</h6>
                        <div className="footer" style={buttonStyle}>
                            <button onClick={onClose}>
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
    children: PropTypes.node,
    username: PropTypes.string,
    handleTextChange: PropTypes.func,
    setUsername: PropTypes.func
};

// Action
export const changeTextAction = text => {
    return {
        type: "change_name",
        value: text
    };
};

// Reducer
export function changeText(state = {username: ""}, action) {
    const username = action.value;
    switch (action.type) {
        case "change_name":
            return username;
        default:
            return state;
    }
}

export function mapStateToProps(state) {
    return {
        username: state.value
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        handleTextChange: (e) => dispatch(changeTextAction(e.target.value))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);