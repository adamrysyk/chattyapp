"use strict"
// server.js
const uuid = require('node-uuid');
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });//does the port need to go here as well???

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  };

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message',(message) => {

    let parsedMsg = JSON.parse(message);
    let colors = ['red', 'blue', 'green', 'purple'];
    let outgoingMessage = {};

    if (parsedMsg.type === 'postMessage') {

      outgoingMessage = {
        id: uuid.v4(),
        type: 'incomingMessage',
        username: parsedMsg.username,
        content: parsedMsg.content,
        color: parsedMsg.color
      }

    } else if (parsedMsg.type === 'postNotification') {

      outgoingMessage = {
        type: 'incomingNotification',
        content: parsedMsg.content
      }

    } else if (parsedMsg.type === 'newUser') {
      outgoingMessage = {
        type: 'userCount',
        content: wss.clients.length,
        color: colors[Math.floor(Math.random() * 4)]
      }
    }

    wss.broadcast(JSON.stringify(outgoingMessage));

  })

  ws.send("Connected to server")

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', (ws) => {

    console.log('Client disconnected')

      let outgoingUserCount = {
        type: 'userCount',
        content: wss.clients.length
      }

      wss.broadcast(JSON.stringify(outgoingUserCount))
  })
})




