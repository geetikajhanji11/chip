import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import './ChipInput.css';
import UserItem from './UserItem.tsx';
import Chip from './Chip.tsx';

interface ChipInputProps {
  users: any[];
}

const ChipInput: React.FC<ChipInputProps> = ({ users }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedChips, setSelectedChips] = useState<any[]>([]);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const [lastChipIndex, setLastChipIndex] = useState<number | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowAllItems(false);
  };

  const handleInputClick = () => {
    setShowAllItems(true);
  };

  const handleItemClick = (item: any) => {
    setInputValue('');
    setSelectedChips([...selectedChips, item]);
    setShowAllItems(false);
  };

  const handleChipDelete = (item: any) => {
    setSelectedChips(selectedChips.filter((chip) => chip !== item));
    setLastChipIndex(null);
  };

  const isUserInSelectedChips = (user: any) => {
    return selectedChips.some((chip) => chip.name === user.name);
  };

  const isSubstringPresent = (mainString: string, subString: string): boolean => {
    const lowerMainString = mainString.toLowerCase();
    const lowerSubString = subString.toLowerCase();
    return lowerMainString.indexOf(lowerSubString) !== -1;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === '' && event.key === 'Backspace' && lastChipIndex === null) {
      const lastChip = selectedChips[selectedChips.length - 1];
      if (lastChip) {
        setLastChipIndex(selectedChips.length - 1);
      }
    } else if (inputValue === '' && event.key === 'Backspace' && lastChipIndex !== null) {
      setSelectedChips(selectedChips.slice(0, -1));
      setLastChipIndex(null);
    } else {
      setLastChipIndex(null);
    }
  };

  const filteredItems = showAllItems
    ? users.filter((user) => !isUserInSelectedChips(user))
    : users.filter(
        (user) =>
          ((isSubstringPresent(user.name.toLowerCase(), inputValue.toLowerCase()) ||
            isSubstringPresent(user.email.toLowerCase(), inputValue.toLowerCase())) &&
            !isUserInSelectedChips(user))
      );

  return (
    <div className="chip-input-container">
      <div className="chip-container">
        {selectedChips.map((chip, index) => (
          <Chip
            key={chip.name}
            chip={chip}
            onChipDelete={() => handleChipDelete(chip)}
            className={lastChipIndex !== null && index === lastChipIndex ? ' highlighted-chip' : ''}
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
              <UserItem item={item} highlightSubstring={inputValue} />
            </li>
          ))}
        </ul>
      )}

      {inputValue && (
        <ul className="item-list">
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              <UserItem item={item} highlightSubstring={inputValue} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipInput;
