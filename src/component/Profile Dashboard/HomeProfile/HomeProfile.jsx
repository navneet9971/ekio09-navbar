import React from "react";
import { Row, Col } from "antd";
import "./HomeProfile.css"; // Import the CSS file containing the styles

function HomeProfile() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="home-profile-container">
      <h2>Home Profile</h2>
      <form onSubmit={handleSubmit}>
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">First Name:</label>
              <input className= "HomeProfile-text" type="text" name="firstName" />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Last Name:</label>
              <input className= "HomeProfile-text" type="text" name="lastName" />
            </div>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Email:</label>
              <input className= "HomeProfile-text" type="text" name="email" />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Mobile Number:</label>
              <input className= "HomeProfile-text" type="text" name="mobileNumber" />
            </div>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Clients:</label>
              <input className= "HomeProfile-text" type="text" name="email" />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Areas of specialization:</label>
              <input className= "HomeProfile-text"type="text" name="mobileNumber" />
            </div>
          </Col>
        </Row>

      

        <button className="homeprofile-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default HomeProfile;
