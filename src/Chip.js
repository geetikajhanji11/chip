import React from 'react';
import './Chip.css';

const Chip = ({ chip, onChipDelete, className }) => {
  return (
    <div className={"chip" + className}>
      <img src={chip.image} alt={`Thumbnail for ${chip.name}`} />
      {chip.name} 
      <span className='cross' onClick={() => onChipDelete(chip)}>
        x
      </span>
    </div>
  );
};

export default Chip;
