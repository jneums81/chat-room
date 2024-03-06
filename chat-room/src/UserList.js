import React from 'react';

const UserList = ({ userList }) => {
  return (
    <div className="user-list">
      <h3>Users Online</h3>
      <ul>
        {userList.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
