import React, {useState} from "react";
import { Link, useHistory} from "react-router-dom";
import { FaUserAlt, FaLock} from "react-icons/fa";
import "../assets/css/global.css";
import axiosInstance from "../../interceptors/axios";


function Login() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    username: '',
    password: '',
  });
  const  [formData, updateFormData] = useState(initialFormData);

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
    }, { withCredentials: true })
    .then((res) => {
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user_id', res.data.profile.id);
      axiosInstance.defaults.headers['Authorization'] =
        'Bearer ' + localStorage.getItem('access_token');
      history.push('navbar/clientdashboard');
      //console.log(res);
      //console.log(res.data);
    });
};

  const signUpButton = () => {
    history.push("/signup");
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
            <button1 onClick={signUpButton} style={{ cursor: "pointer" }}>
              Sign up
            </button1>
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
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button1 onClick={handleSubmit}>Login</button1>
          <Link to="#">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;