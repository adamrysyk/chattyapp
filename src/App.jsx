import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://192.168.33.10:4000")
    this.socket.onopen = () => {
      this.socket.onmessage = (event) => {
        console.log(event.data)
      }
    };
  }




  updateMessages = (newMessage) => {
    console.log(newMessage)
    let newMessages = this.state.messages.slice(0); // make a clone of this.state.messages array
    newMessages.push(newMessage); // add/push the newMessage object into the newMessages array
    console.log(newMessages)
    this.socket.send(JSON.stringify(newMessage))
    this.setState({
      ...this.state, // clone the this.state object
      messages: newMessages // but while cloning it, change the messages value

    })
  }

  render() {
    console.log("Rendering <App />")
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList currUser={ this.state.currentUser.name } messageList={ this.state.messages } />
        <ChatBar
          currUser={ this.state.currentUser.name }
          updateMessages={ this.updateMessages }
        />
      </div>
    );
  }
}
export default App;
