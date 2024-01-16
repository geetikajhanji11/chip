import React from 'react';
import './UserItem.css';

interface UserItemProps {
  item: {
    name: string;
    image: string;
    email: string;
  };
  highlightSubstring: string;
}

const UserItem: React.FC<UserItemProps> = ({ item, highlightSubstring }) => {
  const getHighlightedName = () => {
    if (!highlightSubstring) {
      return item.name;
    }

    const index = item.name.toLowerCase().indexOf(highlightSubstring.toLowerCase());
    if (index === -1) {
      return item.name;
    }

    const prefix = item.name.substring(0, index);
    const highlighted = item.name.substring(index, index + highlightSubstring.length);
    const suffix = item.name.substring(index + highlightSubstring.length);

    return (
      <>
        {prefix}
        <strong>{highlighted}</strong>
        {suffix}
      </>
    );
  };

  return (
    <div className="user-item-container">
      <img
        src={item.image}
        alt={`Thumbnail for ${item.name}`}
        className="user-item-image"
      />
      <div className="user-item-info">
        <div className="user-item-name">{getHighlightedName()}</div>
        <span className="user-item-email">{item.email}</span>
      </div>
    </div>
  );
};

export default UserItem;
