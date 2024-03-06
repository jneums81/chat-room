import React from 'react';

const MessageDisplay = ({ messages }) => {
  return (
    <div className="message-display">
      {messages.map((message, index) => (
        <div key={index} className={message.sender === 'system' ? 'system-message' : 'user-message'}>
          <strong>{message.sender}:</strong> {message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
