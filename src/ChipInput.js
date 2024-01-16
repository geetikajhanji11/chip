import React, { useState } from 'react';
import './ChipInput.css';
import UserItem from './UserItem';
import Chip from './Chip';

const ChipInput = ({ users }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedChips, setSelectedChips] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);
  const [lastChipIndex, setLastChipIndex] = useState(null);


    const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowAllItems(false);
  };



  const handleInputClick = () => {
    setShowAllItems(true);
  };

  const handleItemClick = (item) => {
    setInputValue('');
    setSelectedChips([...selectedChips, item]);
    setShowAllItems(false);
  };

  const handleChipDelete = (item) => {
    setSelectedChips(selectedChips.filter((chip) => chip !== item));
    setLastChipIndex(null); // Reset the lastChipIndex when a chip is deleted
  };

  const isUserInSelectedChips = (user) => {
    return selectedChips.some((chip) => chip.name === user.name);
  };

  const handleKeyDown = event => {
    console.log('User pressed: ', event.key);

    // console.log(message);

    if (inputValue === '' && event.key === 'Backspace' && !lastChipIndex) {
      // 👇️ your logic here
      console.log('Backspace key pressed ✅');
      const lastChip = selectedChips[selectedChips.length - 1];
      if (lastChip) {
        setLastChipIndex(selectedChips.length - 1);
      }

      // const temp = selectedChips
      // setSelectedChips(temp)
    } else if(inputValue === '' && event.key === 'Backspace' && lastChipIndex >= 0) {
        setSelectedChips(selectedChips.slice(0, -1));
          setLastChipIndex(null); // Reset the lastChipIndex
    }
    
    else {
      setLastChipIndex(null);
    }
  };

  const filteredItems = showAllItems
    ? users.filter((user) => !isUserInSelectedChips(user))
    : users.filter(
        (user) =>
          ((user.name.toLowerCase().startsWith(inputValue.toLowerCase()) ||
            user.email.toLowerCase().startsWith(inputValue.toLowerCase())) &&
            !isUserInSelectedChips(user))
      );

  return (
    <div className="chip-input-container">
      <div className="chip-container">
        {selectedChips.map((chip, index) => (
          <Chip
            key={chip.name}
            chip={chip}
            onChipDelete={handleChipDelete}
            className={lastChipIndex ? index === lastChipIndex ? ' highlighted-chip' : '' : ''}
          />
        ))}
      </div>
      <input
        className="ip"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputClick}
        onKeyDown={handleKeyDown}
        placeholder="Add new user..."
      />
      {showAllItems && (
        <ul className="item-list">
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              <UserItem item={item} />
            </li>
          ))}
        </ul>
      )}

{inputValue && (
        <ul className="item-list">
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              <UserItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipInput;