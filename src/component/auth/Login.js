import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "../assets/css/global.css"

function Login() {
  const [user, setUser] = useState(false);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }

  const submitData = () => {
    history.push('/signup');
  };

  const onSubmitData = () => {
    if (validateUsername(username) && validatePassword(password)) {
      setUser(true);
    } else {
      alert("Invalid username or password.");
    }
  };

  const validateUsername = (username) => {
    return /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(username);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,12}$/.test(password);
  };

  if (user) {
    history.push('/navbar');
  }

  return (
    <>
      <div className="login12">
        <div className="form12">
          <div style={{ position: "relative" }}>
            <img src={require(`../assets/icons/eikomp_logo.png`)} className="eikomp_logo" width={230} height={130} alt="logo" />
          </div>
          <p1>Don't have an account?</p1>
          <button onClick={submitData} style={{ cursor: 'pointer' }} id="signup">Sign up
          <div class="arrow-wrapper">
        <div class="arrow"></div>
    </div>
</button>
          <h3 style={{ padding: 0 }}>WELCOME</h3>
          <input
            type="email"
            name="email"
            className="box"
            placeholder="Username (e.g. john@example.com)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className= "boxx"
            placeholder="Password (6-12 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash className="password-icon" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="password-icon" onClick={togglePasswordVisibility} />
          )}
          <input style={{ cursor: 'pointer' }} type="submit" value="LOGIN" id="submit" onClick={onSubmitData}/>
          <Link to="#">Forgot Password?</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
