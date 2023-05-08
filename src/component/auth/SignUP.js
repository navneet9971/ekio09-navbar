import React, { useState } from "react";
import axios from 'axios';
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import "../assets/css/global.css";
import Swal from 'sweetalert2';

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
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Log the form data to the console
    console.log(formData);
  
    // Check if password and confirm password match
    if (formData.password !== formData.password2) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'The password and confirm password do not match.',
      });
      return; // Exit the function to prevent the API request from being made
    }
  
    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text:
          'The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      });
      return; // Exit the function to prevent the API request from being made
    }
  
    // Make a POST request to the API endpoint
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
        // Handle successful registration
        history.push('/'); // Navigate to the homepage
        console.log(res);
        console.log(res.data);
  
        // Check the success status directly from the response
        const success = res.status === 201; // Modify this condition based on the actual success status returned by the API
  
        // Open file browser popup if registration is successful
        if (success) {
          console.log('Registration successful'); // Display success message in console
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Your registration was successful!',
            confirmButtonText: 'OK',
          }).then(() => {
            history.push('/'); // Redirect to the homepage after clicking "OK"
          });
        }
      })
      .catch((error) => {
        // Handle API errors
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          // Display error message to the user
          console.error(errorData); // Log the error response to the console
  
          // Check if the user is already registered
          if (errorData.message && errorData.message.includes('already registered')) {
            Swal.fire({
              icon: 'error',
              title: 'Registration Error',
              text: 'You are already registered. Please use a different email or username.',
            });
          } else {
            // Show generic error message
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred during registration.',
            });
          }
        } else {
          console.error(error); // Log other types of errors to the console
        }
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

