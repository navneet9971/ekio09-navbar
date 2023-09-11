import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axiosInstance from "../../interceptors/axios";
import Swal from "sweetalert2";

function NewPassword() {
  const [formData, setFormData] = useState({
    token: "",
    password: "",
  });
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an API request to send the new password
      const response = await axiosInstance.post("password-reset/confirm/", formData);

      // Log the API response data to the console
      console.log("API Response:", response);

      // Password changed successfully, you can redirect or show a success message
      Swal.fire("Password changed!", "Your password has been updated.", "success");

      // Redirect to a different page after a successful password change
      history.push("/");
    } catch (error) {
      // Handle API request errors
      console.error("API Error:", error);
      Swal.fire("Error", "An error occurred while changing the password.", "error");
    }
  };

  return (
    <div className="New-password"
    style={{
      display: "grid",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Set a specific height for the container
    }}
    >
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="token">Token</label>
          <input
            type="text"
            className="form-control"
            id="token"
            name="token"
            placeholder="Enter your token"
            value={formData.token}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your new password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="button1">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default NewPassword;
