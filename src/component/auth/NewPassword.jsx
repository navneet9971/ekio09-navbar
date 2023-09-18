import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./NewPassword.css"; // Import your CSS file for styling

function NewPassword() {
  const [formData, setFormData] = useState({
    // token: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [token, setToken] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Extract the token value from the URL and set it in the formData state
    const searchParams = new URLSearchParams(location.search);
    const tokenValue = searchParams.get("token");
    console.log(tokenValue);
    setToken(tokenValue)
    setFormData((prevFormData) => ({ ...prevFormData, token: tokenValue }));
  }, [location.search]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handlePasswordToggle1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handlePasswordToggle2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`https://backend.eikompapp.com/NewPassword/${token} `, formData);

      console.log("API Response:", response);
       console.log(formData);
      Swal.fire("Password changed!", "Your password has been updated.", "success");

      history.push("/NewPassword/");
    } catch (error) {
      console.error("API Error:", error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred while changing the password.";
        Swal.fire("Error", errorMessage, "error");
      } else {
        Swal.fire("Error", "An error occurred while changing the password.", "error");
      }
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
              type={showPassword1 ? "text" : "password"}
              id="password1"
              name="password1"
              placeholder="Enter your new password"
              value={formData.password1}
              onChange={handleInputChange}
              required
            />
            <span className="password-toggle-icon" onClick={handlePasswordToggle1}>
              {showPassword1 ? (
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
              type={showPassword2 ? "text" : "password"}
              id="password2"
              name="password2"
              placeholder="Confirm your new password"
              value={formData.password2}
              onChange={handleInputChange}
              required
            />
            <span className="password-toggle-icon" onClick={handlePasswordToggle2}>
              {showPassword2 ? (
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
