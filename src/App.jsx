import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://192.168.33.10:4000")
    this.socket.onopen = () => {
      this.socket.onmessage = (event) => {
        let newMessages = this.state.messages.slice(0); // make a clone of this.state.messages array
        newMessages.push(JSON.parse(event.data));
        this.setState({
          ...this.state, // clone the this.state object
          messages: newMessages // but while cloning it, change the messages value
        })
      }
    };
  }

  updateUser = (newUser) => {
    debugger;
    this.setState({
      ...this.state,
      currentUser: newUser
    })
  }

  updateMessages = (newMessage) => {
     // add/push the newMessage object into the newMessages array
    this.socket.send(JSON.stringify(newMessage))

  }

  render() {
    console.log("Rendering <App />")
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messageList={ this.state.messages } />
        <ChatBar
          currUser={ this.state.currentUser.name }
          updateUser={ this.updateUser }
          updateMessages={ this.updateMessages }
        />
      </div>
    );
  }
}
export default App;
