import React from 'react';
import './UserItem.css';

const UserItem = ({ item }) => {
  return (
    <div className="user-item-container">
      <img
        src={item.image}
        alt={`Thumbnail for ${item.name}`}
        className="user-item-image"
      />
      <div className="user-item-info">
        <strong className="user-item-name">{item.name}</strong>
        <span className="user-item-email">{item.email}</span>
      </div>
    </div>
  );
};

export default UserItem;
