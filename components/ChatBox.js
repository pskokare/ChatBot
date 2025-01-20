import React from 'react';
import MessageList from '.components/MessageList';
import MessageInput from '.components/MessageInput';

const ChatBox = ({ messages, onSendMessage, userMessage, setUserMessage }) => {
  return (
    <div className="chat-box">
      <MessageList messages={messages} />
      <MessageInput 
        userMessage={userMessage} 
        setUserMessage={setUserMessage} 
        onSendMessage={onSendMessage} 
      />
    </div>
  );
};

export default ChatBox;
