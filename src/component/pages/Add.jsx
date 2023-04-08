import React, { useState } from "react";
import { Row, Col } from "antd";
import "./Table.css";

function Add({ selected, setSelected }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const options = ["View", "View/Edit"];


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "industry") {
      setIndustry(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <div className="add-user">
      <h5 className="title">Add User</h5>
      <div className="form-box">
        <Row className="form-body" gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <div className="firstname">
              <label className="form__label" for="firstName">
              {" "}
              </label>
              <input
                type="text"
                name=""
                id="firstname"
                className="form__input"
                value={firstName}
                onChange={(e) => handleInputChange(e)}
                placeholder="FirstName"
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="lastname">
              <label className="form__label" for="lastName">
                {" "}
              </label>
              <input
                type="text"
                name=""
                id="lastName"
                value={lastName}
                className="form__input"
                onChange={(e) => handleInputChange(e)}
                placeholder="LastName"
              />
            </div>
          </Col>
          <Col xs={24}>
            <div className="email_add">
              <label className="form__label" for="email"></label>
              <input
                type="email"
                id="email"
                className="form__input"
                value={email}
                onChange={(e) => handleInputChange(e)}
                placeholder="Email"
              />
            </div>
          </Col>
          <Col xs={24}>
            <div className="industry_add">
              <label className="form__label" for="email"></label>
              <input
                type="industry"
                id="industry"
                className="form__input"
                value={industry}
                onChange={(e) => handleInputChange(e)}
                placeholder="Industry"
              />
            </div>
          </Col>
          <Col xs={24} md={22}>
            <div className="rights">
              <div
                className="dropdown-btn"
                onClick={(e) => setIsActive(!isActive)}>
                {selected}Rights
                <span className="fa-solid fa-caret-down"></span>
              </div>
              {isActive && (
                <div className="dropdown-content">
                  {options.map((option) => (
                    <div
                      onClick={(e) => {
                        setSelected(option);
                        setIsActive(false);
                      }}
                      className="dropdown-item">
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
        <div className="footer">
          <button onClick={() => handleSubmit()} type="submit" className="btn">
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
}

export default Add;
