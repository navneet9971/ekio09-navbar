import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../interceptors/axios";
import Swal from "sweetalert2";
import "./NewPassword.css"; // Import your CSS file for styling

function NewPassword() {
  const [formData, setFormData] = useState({
    token: "",
    password1: "", // Updated name to match the input field
    password2: "", // Updated name to match the input field
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
    <div className="NewPassword-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="password1">New Password</label>
          <input
            type="password"
            id="password1"
            name="password1"
            placeholder="Enter your new password"
            value={formData.password1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirm your new password"
            value={formData.password2}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="button1">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPassword;
