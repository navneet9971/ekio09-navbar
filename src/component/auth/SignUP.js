import React, { useState } from "react";
import axios from 'axios';
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import "../assets/css/global.css";

function SignUP() {
  const history = useHistory();

  const initialFormData = Object.freeze({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
    organization_name: '',
    mobile: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post(`https://eikomp.pythonanywhere.com/register`, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        password2: formData.password2,
        organization_name: formData.organization_name,
        mobile: formData.mobile,
      })
      .then((res) => {
        history.push('/#');
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="auth-box">
      <div className="signup">
        <div className="left-box">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <label>First Name</label>
              <input
                type="text"
                placeholder=""
                name="first_name"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <label>Last Name</label>
              <input
                type="text"
                placeholder=""
                name="last_name"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label>Company Name</label>
              <input
                type="text"
                placeholder=""
                name="organization_name"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label>Email ID</label>
              <input
                type="email"
                placeholder=""
                name="email"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label>Mobile Number</label>
              <input
                type="tel"
                placeholder=""
                name="mobile"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label>Username</label>
              <input
                type="text"
                placeholder=""
                name="username"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label>Password</label>
              <input
                type="password"
                placeholder=""
                name="password"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Confirm Password</label1>
              <input
                type="password"
                placeholder=""
                name="password2"
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <button onClick={handleSubmit} className="button">
            REGISTER NOW
          </button>
        </div>
        <div className="right-box">
          {/* <h2>ElKOMP</h2>
        <p className="p_signup">Efficient Compliances.</p> */}
          <img
            src={require(`../assets/icons/eikomp_logo.png`)}
            width={230}
            height={200}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUP;

