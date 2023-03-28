import React, { useState } from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import "../assets/css/global.css";

function SignUP() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    mobileNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitData = (event) => {
    event.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.companyName &&
      formData.email &&
      formData.mobileNumber &&
      formData.username &&
      formData.password &&
      formData.confirmPassword
    ) {
      history.push("/#");
    } else {
      alert("Please fill in all the required fields");
    }
  };

  return (
    <div className="auth-box">
      <div className="signup">
        <div class="left-box">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <label1>First Name</label1>
              <input
                type="text"
                placeholder=""
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <label1>Last Name</label1>
              <input
                type="text"
                placeholder=""
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Company Name</label1>
              <input
                type="text"
                placeholder=""
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Email ID</label1>
              <input
                type="email"
                placeholder=""
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Mobile Number</label1>
              <input
                type="tel"
                placeholder=""
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>UserName</label1>
              <input
                type="text"
                placeholder=""
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Password</label1>
              <input
                type="password"
                placeholder=""
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Confirm Password</label1>
              <input
                type="password"
                placeholder=""
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Row>
          <button onClick={submitData} className="button">
            REGISTER NOW
          </button>
        </div>
        <div class="right-box">
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
