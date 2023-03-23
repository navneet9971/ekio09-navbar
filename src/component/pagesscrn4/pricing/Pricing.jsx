import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const PricingCard = ({ type, price, features, buttonText }) => {
  return (
    <div className="pricing-card">
      <div className="card-type">{type}</div>
      <h1 className="card-price">{price}</h1>
      <h3 className="month">/ Year</h3>
      <div className="list">
        {features.map((feature, index) => (
          <div className="list-item" key={index}>
            <FontAwesomeIcon
              icon={feature.checked ? faCheck : faTimes}
              className={feature.checked ? "check-icon" : "times-icon"}
            />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
      <button type="button" className="card-btn">
        {buttonText}
      </button>
      <div className="card-bottom">Join Us!</div>
    </div>
  );
};

export default PricingCard;
