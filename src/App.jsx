import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "", color: 'black'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUsers: 0
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://192.168.33.10:4000")

    this.updateOnlineUsers();

    window.addEventListener("unload", this.updateOnlineUsers());

    this.socket.onopen = () => {
      this.socket.onmessage = (event) => {
        let serverMessage = JSON.parse(event.data);

        if (serverMessage.type === 'userCount') {
          this.setState({
            ...this.state,
            currentUser: {
              ...this.state.currentUser,
              color: serverMessage.color
            },
            onlineUsers: serverMessage.content
          })

        } else {
          let newMessages = this.state.messages.slice(0); // make a clone of this.state.messages array
          newMessages.push(serverMessage);
          this.setState({
            ...this.state, // clone the this.state object
            messages: newMessages // but while cloning it, change the messages value
          })
        }
      }
    }
  }

  componentWillUnmount() {
    setTimeout( () => {
      this.socket.send(JSON.stringify({
        type: 'newUser'
      }))
    }, 100);
  }

  updateOnlineUsers = () => {
    setTimeout( () => {
      this.socket.send(JSON.stringify({
        type: 'newUser'
      }))
    }, 100);
  }


  updateUser = (newUser) => {
    console.log(newUser)

    this.setState({
      ...this.state,
      currentUser: {
        ...this.state.currentUser,
        ...newUser
      }
    })

    if (this.state.currentUser.name === '') {
      this.socket.send(JSON.stringify({
        type: "postNotification",
        content: `Anon changed their name to ${newUser.name}`
      }))
    }

    else if (newUser.name !== this.state.currentUser.name) {
      this.socket.send(JSON.stringify({
        type: "postNotification",
        content: `${this.state.currentUser.name} changed their name to ${newUser.name}`
      }))
    }
  }

  updateMessages = (newMessage) => {
    this.socket.send(JSON.stringify(newMessage))

  }

  render() {
    console.log("Rendering <App />")
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <p>{`${this.state.onlineUsers} users online`}</p>
        </nav>
        <MessageList messageList={ this.state.messages } />
        <ChatBar
          currUser={ this.state.currentUser }
          updateUser={ this.updateUser }
          updateMessages={ this.updateMessages }
        />
      </div>
    );
  }
}
export default App;



