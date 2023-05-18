import React, {useState} from "react";
import {  useHistory} from "react-router-dom";
import { FaUserAlt, FaLock} from "react-icons/fa";
import "../assets/css/global.css";
import axiosInstance from "../../interceptors/axios";
import Popup from "../pagesscrn4/popup/Popup";
import Swal from 'sweetalert2';


function Login() {
  const history = useHistory();
  const [linkPopup, setLinkPopup] = useState(false);
  const [forgetemail, setForgetemail] = useState("");
  const initialFormData = Object.freeze({
    username: '',
    password: '',
  });
  const  [formData, updateFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
/*-------forget password handle-------------*/
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
        setLinkPopup(false);
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

 
/*----------LOGIN HANDLE ------------*/

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance.post(`login`, {
      username: formData.username,
      password: formData.password,
    }, {  })
    .then(async res => {
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user_id', res.data.profile.id);
      history.push('/navbar/clientdashboard');
      //console.log(res);
      //console.log(res.data);
    })
    .catch((error) => {
      // handle error during login
      console.error(error);
      
      if (error === 'username_not_match') {
        // show error message for username mismatch
        Swal.fire({
          icon: 'error',
          title: 'Incorrect',
          text: 'Incorrect username. Please try again.',
        });
      } else if (error === 'password_not_match') {
        // show error message for password mismatch
        Swal.fire({
          icon: 'error',
          title: 'Incorrect',
          text: 'Incorrect password. Please try again.',
        });
      } else {
        // handle other errors
        // show a generic error message
        Swal.fire({
          icon: 'error',
          title: 'Please try again later',
          text: 'Incorrect username or password. Please try again.',
        });
      }
    });
};

  const signUpButton = () => {
    history.push("/signup");
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 
  return (
    <div className="auth-box">
      <div className="login">
        <div className="form">
          <div className="top-sec">
            <img
              src={require(`../assets/icons/eikomp_logo.png`)}
              className="eikomp_logo"
              width={230}
              height={150}
              alt="logo"
            />
            <p>Don't have an account?</p>
            <button className="button1" onClick={signUpButton} style={{ cursor: "pointer" }}>
              Sign up
            </button>
            <h3 style={{ padding: 0 }}>WELCOME</h3>
          </div>
          <div className="input-box">
            <FaUserAlt />
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              />
          </div>
          <div className="input-box">
            <FaLock />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
                          />
                          <span className = "login-showpass" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' , margin: '1px'}}>
                  {showPassword ? '🙈' : '👁️'}
                  </span>
                        </div>
         

          <button className="button1" onClick={handleSubmit}>Login</button>
          
          <span onClick = {() => setLinkPopup(true)} 
           style={{ cursor: 'pointer', margin: '15px' }}
          >Forgot Password?</span>
           <Popup trigger={linkPopup} setTrigger={setLinkPopup}>
            <h3 className="email-popup">ENTER YOU EMAIL ID</h3>
            <label className="forget-email">
              Enter your email:
              <input
              className="forgetinput"
              type="text"
              onChange={(event) => setForgetemail(event.target.value)} />
            </label>
          <button className="forgetbtn" onClick={handleforgetemail}>Send</button>
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Login;