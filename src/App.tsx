import React, { useEffect, useState } from 'react';
import ChipInput from './ChipInput.tsx';
import './App.css';

interface RandomUser {
  name: string;
  email: string;
  image: string;
}

const App: React.FC = () => {
  const [randomUsers, setRandomUsers] = useState<RandomUser[]>([]);

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=20&nat=us');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const users: RandomUser[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          image: user.picture.thumbnail,
        }));

        setRandomUsers(users);
      } catch (error) {
        console.error('Error fetching random users:', error.message);
      }
    };

    fetchRandomUsers();
  }, []); 

  return (
    <div className="App">
      <div className="heading">Pick Users</div>
      <ChipInput users={randomUsers} />
    </div>
  );
};

export default App;
