import React,{useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axiosInstance from "../../interceptors/axios";
import Swal from "sweetalert2";

function ForgetPassword() {

    const [forgetemail, setForgetemail] = useState("");
    const history = useHistory();

    const handleforgetemail = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', forgetemail);
      
      
      
        axiosInstance
          .post('password-reset/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            // Handle successful registration
            history.push('/'); // Navigate to the homepage
            console.log(res);
            console.log(res.data);
      
            // Check the success status directly from the response
            const success = res.status === 200; // Modify this condition based on the actual success status returned by the API
      
            // Open file browser popup if registration is successful
            if (success) {
              Swal.fire({
                icon: 'success',
                title: 'Link Send',
                text: 'Password Reset Link Sent to Your Email ID',
                confirmButtonText: 'OK',
              });
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              Swal.fire({
                icon: 'error',
                title: 'Email Not Registered',
                text: 'Please enter a registered email address.',
                confirmButtonText: 'OK',
              });
            }
          });
      };
    return (
        <div>
        <h3 className="email-popup">ENTER YOU EMAIL ID</h3>
        <label className="forget-email">
          Enter your email:
          <input
          className="forgetinput"
          type="text"
          onChange={(event) => setForgetemail(event.target.value)} />
        </label>
      <button className="forgetbtn" onClick={handleforgetemail}>Send</button>
      </div>
    );
};

export default ForgetPassword;