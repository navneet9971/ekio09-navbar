import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./NewPassword.css"; // Import your CSS file for styling

function NewPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { token: routeToken } = useParams();
  const [savedToken, setSavedToken] = useState("");
  console.log(routeToken);
  console.log(savedToken);

  useEffect(() => {
    // Extract the token value from the URL and set it in the formData state
    const searchParams = new URLSearchParams(location.search);
    const tokenValue = searchParams.get("token");
    setSavedToken(tokenValue);

    console.log("Token from URL:", tokenValue);

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
      // Use the savedToken from the useEffect for the Axios POST request URL
      const response = await axios.post(`https://backend.eikompapp.com/NewPassword/${savedToken}`, formData);

      console.log("API Response:", response);
      Swal.fire("Password changed!", "Your password has been updated.", "success");

      // Move this inside the try block since it depends on the success of the API call
      localStorage.setItem("sendToken", savedToken);

      history.push("/");
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
          <label htmlFor="password">New Password</label>
          <div className="password-input">
            <input
              type={showPassword1 ? "text" : "password"}
              id="confirmPassword"
              name="password"
              placeholder="Enter your new password"
              value={formData.password}
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input">
            <input
              type={showPassword2 ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
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
