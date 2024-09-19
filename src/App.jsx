import { useState } from 'react';
import UserForm from './UserForm';
import UserAdmin from './UserAdmin';

const App = () => {
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [users, setUsers] = useState([]);

  const handleUserAdded = async () => {
    try {
      const response = await fetch("https://server-sable-one.vercel.app/users", {
        mode: 'cors', // Include mode: 'cors' here
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const toggleAdminPanel = async () => {
    if (!isAdminVisible) {
      await handleUserAdded(); // Fetch fresh data when opening the admin panel
    }
    setIsAdminVisible(!isAdminVisible);
  };

  return (
    <div>
      {isAdminVisible ? (
        <UserAdmin users={users} />
      ) : (
        <UserForm onUserAdded={handleUserAdded} />
      )}
      <button
        onClick={toggleAdminPanel}
        style={{ marginTop: '20px' }}
      >
        {isAdminVisible ? 'Back to Form' : 'View Admin Panel'}
      </button>
    </div>
  );
};

export default App;
