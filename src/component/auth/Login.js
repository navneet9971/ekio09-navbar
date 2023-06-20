import React, {useState} from "react";
import {  useHistory} from "react-router-dom";
import { FaUserAlt, FaLock} from "react-icons/fa";
import "../assets/css/global.css";
import axiosInstance from "../../interceptors/axios";
import Popup from "../popup/Popup";
import Swal from 'sweetalert2';
import ForgetPassword from "./Forgetpassword";
// import PricingCard from "../PricingCard/PricingCard";


function Login() {
  const history = useHistory();
  const [linkPopup, setLinkPopup] = useState(false);
  const initialFormData = Object.freeze({
    username: '',
    password: '',
  });
  const  [formData, updateFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  
/*-------forget password handle-------------*/

 
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
      localStorage.setItem("first_time", res.data.profile.first_time)

      if (res.data.profile.first_time === true) {
        axiosInstance.patch(`user/${res.data.profile.id}/`, {"first_time": false})
        .then((patchRes) => {
          // Handle the response if needed
          console.log(patchRes)
        })
        .catch((patchError) => {
          // Handle the error if needed
        }); }

      history.push('/navbar/clientdashboard');
      //console.log(res);
      //console.log(res.data);
    })
    .catch((error) => {
      // handle error during login
      console.error(error);
        // show a generic error message
        Swal.fire({
          icon: 'error',
          title: 'Please try again later',
          text: 'Incorrect username or password. Please try again.',
        });
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
            <ForgetPassword />
          </Popup>

          <button className="button1" onClick={signUpButton} style={{ cursor: "pointer" }}>
              Sign up
            </button>
        </div>
      </div>
        {/* <PricingCard /> */}
    </div>
    
   

    
  );
}

export default Login;