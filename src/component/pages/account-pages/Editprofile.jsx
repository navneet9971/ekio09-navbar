import React, { useState } from 'react';
import "./Edit.css";

function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [hasValidPassword, setHasValidPassword] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentPassword === 'Abc@123') { // replace with actual password validation logic
      setHasValidPassword(true);
    } else {
      alert('Invalid password. Please try again.');
    }
  }

  const handleAddUserSubmit = (event) => {
    event.preventDefault();
    // add code to handle adding new user here
    alert('New user added successfully!');
  }

  const handleEditUserSubmit = (event) => {
    event.preventDefault();
    // add code to handle editing user here
    alert('User edited successfully!');
  }

  if (!hasValidPassword) {
    return (
      <div className="form-box">
        <h18>Enter Your Current Password</h18>
        <div className="scroll-text">
  <span>Default Password: Abc@123</span>
       </div>
        <form onSubmit={handleSubmit}>
          <label11>
            <input
              type="password1"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder='Current Password'
            />
          </label11>
          <br />
          <button type="submit">Submit</button>
       
        </form>
      </div>
    );
  }

  return (
    <div>
      <button25 onClick={() => setShowAddUser(true)}>Add User</button25>

      <div className="form-box">
          <h2>Edit User:</h2>
          <form onSubmit={handleEditUserSubmit}>
          <label>
               User Name:
                 <input type="text1" required />
                   </label>
                   <br />
                <label>
                  New Password:
                    <input type="password1" required />
                   </label>
                      <br />
                     <button type="submit">Save</button>
          </form>
        </div>

      <br />

      {showAddUser &&
        <div className="form-box">
          <h2>Add User:</h2>
          <form onSubmit={handleAddUserSubmit}>
            <label>
              Name:
              <input type="text1" required />
            </label>
            <br />
            <label>
              Email:
              <input type="email1" required />
            </label>
            <br />
            <button type="submit">Add User</button>
          </form>
        </div>
      }
    </div>
  );
}

export default PasswordForm;
