import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currUser: '',
      message: ''
    }
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      currUser: this.props.currUser ? this.props.currUser : ''
    })
  };

  handleInputMessage = (e) => {
    this.setState({
      ...this.state,
      message: e.target.value
    })
  };

  handleInputUser = (e) => {
    this.setState({
      ...this.state,
      currUser: e.target.value
    })
  };

  _handleUserKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value.trim() !== '') {
        this.props.updateUser({
          name: this.state.currUser.trim()
        })
      }
    }
  };

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.state.message) {
        this.props.updateMessages({
          type: "postMessage",
          username: this.props.currUser.name ? this.props.currUser.name : 'Anon',
          content: this.state.message,
          color: this.props.currUser.color
        })
      }
      this.setState({
        ...this.state,
        message: ''
      })
    }
  };

  render() {
    console.log("Rendering <ChatBar />")
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Type a username and hit ENTER"
          value={ this.state.currUser.name }
          onChange={ this.handleInputUser}
          onKeyPress={this._handleUserKeyPress}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onChange={ this.handleInputMessage }
          onKeyPress={this._handleKeyPress}
          value={ this.state.message }
        />
      </footer>
    );
  }
};

export default ChatBar;