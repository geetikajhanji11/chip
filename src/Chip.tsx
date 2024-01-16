import React from 'react';
import './Chip.css';

interface ChipProps {
  chip: {
    image: string;
    name: string;
  };
  onChipDelete: (chip: { image: string; name: string }) => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ chip, onChipDelete, className }) => {
  return (
    <div className={`chip${className ? ' ' + className : ''}`}>
      <img src={chip.image} alt={`Thumbnail for ${chip.name}`} />
      {chip.name} 
      <span className='cross' onClick={() => onChipDelete(chip)}>
        x
      </span>
    </div>
  );
};

export default Chip;
