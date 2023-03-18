import React, { useState, useEffect } from 'react';
import "./Edit.css";

const UserProfile = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [newUser, setNewUser] = useState({ email: '', password: '' });
  const [editing, setEditing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Fetch user data from login dataset
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (isVerified) {
      // Update user data with the new data
      fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
        .then(res => res.json())
        .then(data => {
          setUser(data);
          setNewUser({ email: '', password: '' });
          setEditing(false);
          setIsVerified(false);
        })
        .catch(error => console.error(error));
    } else {
      alert('Please verify before submitting!');
    }
  };

  const handleVerification = () => {
    // Perform verification
    setIsVerified(true);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {editing ? <input type="text" name="email" value={newUser.email} onChange={handleInputChange} /> : user.email}</p>
      <p>Password: {editing ? <input type="text" name="password" value={newUser.password} onChange={handleInputChange} /> : user.password}</p>
      {editing ?
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
        :
        <button onClick={handleEdit}>Edit</button>
      }
      <h2>Add User</h2>
      <form>
        <label>Email:</label>
        <input type="text" name="email" value={newUser.email} onChange={handleInputChange} />
        <label>Password:</label>
        <input type="text" name="password" value={newUser.password} onChange={handleInputChange} />
        <button type="button" onClick={handleVerification}>Verify</button>
        <button type="button" onClick={handleSave}>Submit</button>
      </form>
    </div>
  );
};

export default UserProfile;
