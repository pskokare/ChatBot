import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const App = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!userMessage) {
      alert('Message cannot be empty');
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userMessage }
    ]);

    axios
      .post('http://localhost:5000/messages', { userMessage })
      .then((response) => {
        const botReply = response.data.botReply;

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botReply }
        ]);
      })
      .catch((error) => {
        console.error('There was an error sending the message!', error);
      });

    setUserMessage('');
  };

  return (
    <div className="App">
      <h1>Welcome To ChatBoT</h1>
      <div className="chatbox">
        <MessageList messages={messages} />
        <MessageInput 
          userMessage={userMessage} 
          setUserMessage={setUserMessage} 
          sendMessage={sendMessage} 
        />
      </div>
    </div>
  );
};

export default App;