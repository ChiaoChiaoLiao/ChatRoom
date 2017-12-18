const React = require('react');
const PropTypes = require('prop-types');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    handleTextChange(e) {
        this.props.setUsername(e.target.value);
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

export default Modal;