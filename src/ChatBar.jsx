import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar />")
    return (
      <footer>
        <input id="username" type="text" placeholder={ this.props.currUser } />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;