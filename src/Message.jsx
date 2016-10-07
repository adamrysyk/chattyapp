import React, {Component} from 'react';

class Message extends Component {
  render() {

    let messageStyle = this.props.content.color ? { 'color': this.props.content.color } : {'color': 'black'}

    console.log("Rendering <Message />")
    return (
      <div>
        <div className="message">
          <span
            className="username"
            style={ messageStyle }>
            { this.props.username }
          </span>
          <span className="content">{ this.props.content.content }</span>
        </div>
      </div>
    );
  }
}
export default Message;