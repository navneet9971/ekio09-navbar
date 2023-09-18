import React, { useState } from "react";
// import { useNavigate } from "react-router-dom/cjs/react-router-dom.min";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../interceptors/axios";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

function ForgetPassword() {
  const [forgetemail, setForgetemail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleforgetemail = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", forgetemail);

    axiosInstance
      .post("password-reset/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Check the success status directly from the response
        const success = res.status === 200; // Modify this condition based on the actual success status returned by the API
        // Open file browser popup if registration is successful
        if (success) {
          Swal.fire({
            icon: "success",
            title: "Link Send",
            text: "Password Reset Link Sent to Your Email ID",
            confirmButtonText: "OK",
          }).then(() => {
            setIsLoading(false); // Set isLoading to false after user interaction with SweetAlert2
            navigate("/"); // Navigate to the forget password page 
          });
        }
      })  
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Email Not Registered",
            text: "Please enter a registered email address.",
            confirmButtonText: "OK",
          });
        }
        setIsLoading(false); // Set isLoading to false in case of an error
      });

    setIsLoading(true); // Set isLoading to true to display the loading spinner
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}

      <h3 className="email-popup">ENTER YOUR EMAIL ID</h3>
      <label className="forget-email">
        Enter your email:
        <input
          className="forgetinput"
          type="text"
          onChange={(event) => setForgetemail(event.target.value)}
        />
      </label>
      <button className="forgetbtn" onClick={handleforgetemail}>
        Send
      </button>
    </div>
  );
}

export default ForgetPassword;
