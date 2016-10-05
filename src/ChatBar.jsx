import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  handleInputMessage = (text) => {
    this.setState({
      message: text
    })
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.updateMessages({
        username: this.props.currUser,
        content: this.state.message
      })
    }
  }

  render() {
    console.log("Rendering <ChatBar />")
    return (
      <footer>
        <input
          id="username"
          type="text"
          value={ this.props.currUser }
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onChange={ (e) => { this.handleInputMessage(e.target.value) } }
          onKeyPress={this._handleKeyPress}
          value={ this.state.message }
        />
      </footer>
    );
  }
}
export default ChatBar;