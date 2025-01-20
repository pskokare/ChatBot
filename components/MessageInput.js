import React from 'react';

const MessageInput = ({ userMessage, setUserMessage, sendMessage }) => {
  return (
    <form onSubmit={sendMessage} className="message-input">
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
