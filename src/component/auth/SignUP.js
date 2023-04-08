import React, { useState } from "react";
import axios from 'axios';
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import "../assets/css/global.css";

function SignUP() {
  const history = useHistory();
 //const [isServerSideError, setIsServerSideError] = useState(false);
 //const [serverErrors, setServerErrors] = useState([]);
  const initialFormData = Object.freeze({
    username: '',
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
				history.push('/');
				console.log(res);
				console.log(res.data);
			});
	};

  return (
    <div className="auth-box">
      <div className="signup">
        <div className="left-box">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <label1>First Name</label1>
              <input
                type="text"
                placeholder=""
                name="first_name"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <label1>Last Name</label1>
              <input
                type="text"
                placeholder=""
                name="last_name"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Company Name</label1>
              <input
                type="text"
                placeholder=""
                name="organisation_name"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Email ID</label1>
              <input
                type="email"
                placeholder=""
                name="email"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Mobile Number</label1>
              <input
                type="tel"
                placeholder=""
                name="mobile"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Username</label1>
              <input
                type="text"
                placeholder=""
                name="username"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Password</label1>
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

