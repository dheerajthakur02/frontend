import "./App.css";
import React, { useEffect, useState } from "react";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://server-sable-one.vercel.app/users", {
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  return (
    <div className="user-admin container">
      <h2>Admin Panel</h2>
      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <p>Name: {user.name}</p>
            <p>User Handle: {user.userHandle}</p>
            {user.imageUrls && user.imageUrls.length > 0 && (
              <div>
                <h3>Uploaded Images:</h3>
                <div className="thumbnail-gallery">
                  {user.imageUrls.map((url, imgIndex) => (
                    <a key={imgIndex} href={url} target="_blank" rel="noopener noreferrer">
                      <img src={url} alt={`User upload ${imgIndex}`} className="thumbnail" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAdmin;
