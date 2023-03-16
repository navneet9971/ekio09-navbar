import React from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import "../assets/css/global.css";

function SignUP() {
  const history = useHistory();

  const submitData = (data) => {
    history.push("/navbar/clientdashboard");
  };
  return (
    <div className="auth-box">
      <div className="signup">
        <div class="left-box">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <label>First Name</label>
              <input type="text" placeholder="" />
            </Col>
            <Col xs={24} md={12}>
              <label>Second Name</label>
              <input type="text" placeholder="" />
            </Col>
            <Col xs={24} md={24}>
              <label>Username</label>
              <input type="text" placeholder="" />
            </Col>
            <Col xs={24} md={24}>
              <label>Email</label>
              <input type="email" placeholder="" />
            </Col>
            <Col xs={24} md={24}>
              <label>Phone number</label>
              <input type="tel" placeholder="" />
            </Col>
            <Col xs={24} md={24}>
              <label>Choose your package</label>
              <input type="text" placeholder="" />
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
            height={150}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUP;
