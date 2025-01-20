import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <strong>{msg.sender === 'user' ? 'You:  ' : 'Bot:  '}</strong>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
