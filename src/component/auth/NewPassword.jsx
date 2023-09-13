import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../interceptors/axios";
import Swal from "sweetalert2";
import "./NewPassword.css"; // Import your CSS file for styling

function NewPassword() {
  const [formData, setFormData] = useState({
    token: "",
    password1: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("password-reset/confirm/", formData);

      console.log("API Response:", response);

      Swal.fire("Password changed!", "Your password has been updated.", "success");

      history.push("/");
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire("Error", "An error occurred while changing the password.", "error");
    }
  };

  return (
    <div className="NewPassword-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box-password">
          <label htmlFor="password1">New Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password1"
              name="password1"
              placeholder="Enter your new password"
              value={formData.password1}
              onChange={handleInputChange}
              required
            />
            {/* Password visibility toggle icon */}
            <span className="password-toggle-icon" onClick={handlePasswordToggle}>
              {showPassword ? (
                <span role="img" aria-label="Hide Password">🙈</span>
              ) : (
                <span role="img" aria-label="Show Password">👁️</span>
              )}
            </span>
          </div>
        </div>
        <div className="input-box-password">
          <label htmlFor="password2">Confirm Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password2"
              name="password2"
              placeholder="Confirm your new password"
              value={formData.password2}
              onChange={handleInputChange}
              required
            />
            {/* Password visibility toggle icon */}
            <span className="password-toggle-icon" onClick={handlePasswordToggle}>
              {showPassword ? (
                <span role="img" aria-label="Hide Password">🙈</span>
              ) : (
                <span role="img" aria-label="Show Password">👁️</span>
              )}
            </span>
          </div>
        </div>
        <button type="submit" className="button-forgetpassword">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPassword;
