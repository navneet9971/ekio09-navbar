import React, { useState } from "react";
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
    <div className="add">
      <div className="user">Add User</div>
      <div className="form-body">
        <div className="username">
          <label className="form__label" for="firstName"></label>

          <input
            className="form__input"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First Name"
          />
        </div>
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

<div className="inds_add">
          <label className="form__label" for="industry"></label>
          <input
            type="industry"
            id="industry"
            className="form__input"
            value={industry}
            onChange={(e) => handleInputChange(e)}
            placeholder="Industry"
          />
          
        </div>
        <div className="rights">
          <div className="dropdown-btn" onClick={(e) =>
            setIsActive(!isActive)}>
            {selected}Rights
            <span className="fa-solid fa-caret-down"></span>
          </div>
          {isActive && (
            <div className="dropdown-content">
              {options.map((option) => (
                <div onClick={(e) => {
                  setSelected(option)
                  setIsActive(false)
                }}
                  className="dropdown-item">
                  {option}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
      <div class="footer">
        <button onClick={() => handleSubmit()} type="submit" class="btn">
          CONFIRM
        </button>
      </div>
    </div>
  );
}

export default Add;