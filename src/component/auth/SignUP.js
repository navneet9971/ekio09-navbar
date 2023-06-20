import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import "../assets/css/global.css";
import Swal from "sweetalert2";

function SignUp() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const initialFormData = {
    username: "",
    password: "",
    password2: "",
    email: "",
    first_name: "",
    last_name: "",
    organization_name: "",
    mobile: "",
    industry: "", // Add the industry field to the initial form data
  };
  const [formData, setFormData] = useState(initialFormData);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Fetch the dropdown data from the API
    axios
      .get("https://backend.eikompapp.com/industry")
      .then((response) => {
        // Update the options state with the fetched data
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dropdown data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if password and confirm password match
    if (formData.password !== formData.password2) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The password and confirm password do not match.",
      });
      return; // Exit the function to prevent the API request from being made
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text:
          "The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
      return; // Exit the function to prevent the API request from being made
    }

    // Make a POST request to the API endpoint
    axios
      .post("https://backend.eikompapp.com/register", formData)
      .then((res) => {
        // Handle successful registration
        console.log(res);
        console.log(res.data);

        // Check the success status directly from the response
        const success = res.status === 201; // Modify this condition based on the actual success status returned by the API

        // Open file browser popup if registration is successful
        if (success) {
          console.log("Registration successful"); // Display success message in console
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Your registration was successful!",
            confirmButtonText: "OK",
          }).then(() => {
            history.push("/"); // Redirect to the homepage after clicking "OK"
          });
        }
      })
      .catch((error) => {
        // Handle API errors
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          // Display error message to the user
          console.error(errorData); // Log the error response to the console

          // Check for username error
          if (errorData.username && Array.isArray(errorData.username)) {
            // Display username error message using Swal
            Swal.fire({
              icon: "error",
              title: "Already used username",
              text: errorData.username[0],
            });
          }

          // Check for email error
          if (errorData.email && Array.isArray(errorData.email)) {
            // Display email error message using Swal
            Swal.fire({
              icon: "error",
              title: "Email already registered",
              text: errorData.email[0],
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
              {/* <label className="signup-title">First Name</label> */}
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              {/* <label className="signup-title">Last Name</label> */}
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              {/* <label className="signup-title">Company Name</label> */}
              <input
                type="text"
                placeholder="Company Name"
                name="organization_name"
                value={formData.organization_name}
                onChange={handleChange}
                required
              />
            {/* </Col>
                        <Col xs={24} md={24}> */}
              {/* <label className="signup-title">Industry Name</label> */}
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="">Select Your Industry</option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {formData.industry === '' && (
                <p style={{ color: 'red' }}>Please select the industry</p>
              )}
            {/* </Col>

            <Col xs={24} md={24}> */}
              {/* <label className="signup-title">Email ID</label> */}
              <input
                type="email"
                placeholder="Email ID"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            {/* </Col>
            <Col xs={24} md={24}> */}
              <label className="signup-title">Mobile Number</label>
              <input
                type="tel"
                placeholder="10 Digit Number Only"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              {/* <label className="signup-title">Username</label> */}
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              {/* <label className="signup-title">Password</label> */}
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <div
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "🙈" : "👁️"}
                </div>
              </div>
            </Col>
            {formData.password === '' && (
                <p style={{ color: 'red' }}>Please select the industry</p>
              )}
            <Col xs={24} md={24}>
              <label className="signup-title">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                />
                <div
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </div>
              </div>
            </Col>
          </Row>
          <button onClick={handleSubmit} className="button">
            REGISTER NOW
          </button>
        </div>
        <div className="right-box">
          <img
            src={require("../assets/icons/eikomp_logo.png")}
            width={230}
            height={200}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
