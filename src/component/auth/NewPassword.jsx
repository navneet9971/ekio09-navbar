import React, { useState, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axiosInstance from "../../interceptors/axios";
import Swal from "sweetalert2";
import "./NewPassword.css"; // Import your CSS file for styling

// Define your URL parameter keys as constants
const TOKEN_PARAM = "https://eikompapp.com/NewPassword/confirm/?token=3e73fd103514f4a1526fbf19";

function NewPassword() {
  const [formData, setFormData] = useState({
    token: "", // Initialize token as an empty string
    password1: "",
    password2: "",
    // Add additional parameters here
    param1: "",
    param2: "",
  });
  const [showPassword1, setShowPassword1] = useState(false); // State to control password visibility for password1
  const [showPassword2, setShowPassword2] = useState(false); // State to control password visibility for password2
  const history = useHistory();
  const location = useLocation();

  // Function to extract the token value from the URL
  const extractTokenFromURL = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenValue = searchParams.get(TOKEN_PARAM);
    return tokenValue || "";
  }, [location.search]);

  useEffect(() => {
    // Extract the token value from the URL and set it in the formData state
    const tokenValue = extractTokenFromURL;
    setFormData((prevFormData) => ({ ...prevFormData, token: tokenValue }));
  }, [location.search, extractTokenFromURL]);

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
      // Add the additional parameters to the formData object
      const updatedFormData = {
        ...formData,
        param1: "value1", // Replace with the actual value you want to send
        param2: "value2", // Replace with the actual value you want to send
      };

      const response = await axiosInstance.post("password-reset/confirm/", updatedFormData);

      console.log("API Response:", response);

      Swal.fire("Password changed!", "Your password has been updated.", "success");

      history.push("/");
    } catch (error) {
      console.error("API Error:", error);

      // Handle specific errors and show relevant error messages to the user
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
            {/* Password visibility toggle icon */}
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
            {/* Password visibility toggle icon */}
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
