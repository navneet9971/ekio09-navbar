import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axiosInstance from "../interceptors/axios";
import { useLocation } from "react-router-dom";
import useLogo from "./assets/icons/eikomp_logo.png";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
  
    axiosInstance
      .post("password-reset/confirm/", { password, token })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Password Reset Successful",
          text: "Your password has been successfully reset.",
        }).then(() => {
          window.close(); // Close the page after displaying the success message
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Password Reset Failed",
          text: "An error occurred while resetting your password. Please try again.",
        });
      });
  };
  

  return (
    <div className="forget-boxmo">
       <img src={useLogo} alt="" className="forgotlogo" />
      <h2 className="rest-pass">Reset Password</h2>
      <form onSubmit={handleResetPassword}>
       
        <label className="pasword-forget">New Password:</label>
        <div className="password-input">
          <input
          className="pasword"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <i
            className={`password-toggle-icon ${
              showPassword ? "fas fa-eye-slash" : "fas fa-eye"
            }`}
            onClick={togglePasswordVisibility}
          ></i>
       

        <div className="token-input" style={{ display: token ? 'none' : 'block' }}>
  <label>Hidden Field Token</label>
  <input value={token} />

  {console.log(token)}
</div>
        </div>
        <button className="submit-forget" onClick={handleResetPassword}>Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
