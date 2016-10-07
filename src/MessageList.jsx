import React, {Component} from 'react';
import Message from './Message.jsx'
import Notification from './Notification.jsx'

class MessageList extends Component {

  messageType = (message, index) => {
    if (message.type === 'incomingMessage') {
      return (
        <Message
          key={ index }
          type ={ message.type }
          username={ message.username }
          content={ message } />
      )
    }
    if (message.type === 'incomingNotification') {
      console.log(message.content)
      return (
        <Notification
          key={ index }
          content={ message.content } />
      )
    }
  }

  render() {

    return (
      <div id="message-list">
       {
        this.props.messageList.map( (message, index) => {
         return (this.messageType(message, index))
        })
       }
      </div>
    )
  }
}
export default MessageList;

