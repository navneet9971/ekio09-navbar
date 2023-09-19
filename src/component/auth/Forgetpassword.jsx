import React, { useState } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

function ForgetPassword({ onClose }) {
  const [forgetemail, setForgetemail] = useState("");
  // const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleforgetemail = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", forgetemail);

    axios
      .post("https://backend.eikompapp.com/forgot_password/", formData, {
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
            onClose(); // Close the popup after download is complete
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
          style={{
            margin: "18px",
            padding: "6px 15px",
            fontSize: "16px",
            border: "1px solid #0e0e0e",
            borderRadius: "4px",
          }}
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
