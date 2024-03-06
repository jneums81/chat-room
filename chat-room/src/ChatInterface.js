import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import LoginForm from './LoginForm';
import MessageDisplay from './MessageDisplay';
import InputArea from './InputArea';
import UserList from './UserList';

const socket = io('http://localhost:3001'); // Replace with your server's URL

const ChatInterface = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Socket.io event listeners (connect, disconnect, message)
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Custom event for receiving messages from the server
    socket.on('message', (message) => {
      // Update state with the new message
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Custom event for updating the user list
    socket.on('userList', (users) => {
      setUserList(users);
    });

    return () => {
      // Cleanup when the component unmounts
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (messageContent) => {
    // Emit a message to the server
    socket.emit('sendMessage', { content: messageContent, sender: currentUser });
  };

  const handleLogin = (username) => {
    // Set the current user and emit a login event to the server
    setCurrentUser(username);
    socket.emit('login', username);
  };

  return (
    <div>
      {currentUser ? (
        <>
          <MessageDisplay messages={messages} />
          <UserList userList={userList} />
          <InputArea onSendMessage={handleSendMessage} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default ChatInterface;
