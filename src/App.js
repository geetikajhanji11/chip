import ChipInput from './ChipInput';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const users = data.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          image: user.picture.thumbnail
        }));

        setRandomUsers(users);
      } catch (error) {
        console.error('Error fetching random users:', error.message);
      }
    };

    // Call the function to fetch random users when the component mounts
    fetchRandomUsers();
  }, []); // Empty dependency array ensures the effect runs only once on mount


  return (
    <div className="App">
      <div className='heading'>Pick Users</div>
      <ChipInput users={randomUsers}/>
    </div>
  );
}

export default App;
