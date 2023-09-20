import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./NewPassword.css";

function NewPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // State for password match
  const [passwordError, setPasswordError] = useState(""); // Error message for password match
  const history = useHistory();
  const location = useLocation();
  const { token: routeToken } = useParams();
  const [savedToken, setSavedToken] = useState("");
  console.log(routeToken);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenValue = searchParams.get("token");
    setSavedToken(tokenValue);
  }, [location.search]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    // Check if passwords match and update the state
    if (name === "confirmPassword") {
      if (value === formData.password) {
        setPasswordMatch(true);
        setPasswordError("");
      } else {
        setPasswordMatch(false);
        setPasswordError("Passwords do not match.");
      }
    }
  };

  const handlePasswordToggle1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handlePasswordToggle2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      Swal.fire(
        "Invalid Password",
        "A strong password should contain at least one capital letter, one number, and one special character.",
        "error"
      );
      return;
    }

    // Check if passwords match before making the API request
    if (!passwordMatch) {
      Swal.fire("Passwords do not match.", passwordError, "error");
      return;
    }

    try {
      const response = await axios.post(
        `https://backend.eikompapp.com/NewPassword/${savedToken}`,
        formData
      );

      console.log("API Response:", response);
      Swal.fire("Password changed!", "Your password has been updated.", "success");

      localStorage.setItem("sendToken", savedToken);

      history.push("/");
    } catch (error) {
      console.error("API Error:", error);

      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "An error occurred while changing the password.";
        Swal.fire("Error", errorMessage, "error");
      } else {
        Swal.fire("Error", "An error occurred while changing the password.", "error");
      }
    }
  };

  return (
    <div className="NewPassword-container">
      <h2>Reset Password</h2>
      <form className= "forgot-password-form" onSubmit={handleSubmit}>
        <div className="input-box-password">
          <h4 style={{ color: "red", fontWeight: "100" }}>
            A strong 8-character password should contain letters, numbers, and special characters
          </h4>
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
                <span role="img" aria-label="Hide Password">
                  🙈
                </span>
              ) : (
                <span role="img" aria-label="Show Password">
                  👁️
                </span>
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
                <span role="img" aria-label="Hide Password">
                  🙈
                </span>
              ) : (
                <span role="img" aria-label="Show Password">
                  👁️
                </span>
              )}
            </span>
          </div>
          {!passwordMatch && (
            <p className="error-message">{passwordError}</p>
          )}
        </div>
        <button type="submit" className="button-forgetpassword">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPassword;
