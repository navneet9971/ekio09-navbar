import React from 'react';
import "./Package.css";
import PricingCard from "../../pagesscrn4/pricing/Pricing";

const App = () => {
  const pricingCards = [
    {
      type: "Start-up",
      price: "$160",
      features: [
        { text: "Validity: 12 months", checked: true },
        { text: "View list of compliance", checked: true },
        { text: "Upload forms", checked: true },
        { text: "Request for Lab testing", checked: true },
        { text: "Customer Support : 3 per month ", checked: true },
      ],
      buttonText: "Buy Now",
    },
    {
      type: "Standard",
      price: "24.99$",
      features: [
        { text: "Lorem ipsum dolor sit.", checked: true },
        { text: "Lorem ipsum dolor sit.", checked: true },
        { text: "Lorem ipsum dolor sit.", checked: true },
        { text: "Lorem ipsum dolor sit.", checked: true },
        { text: "Lorem ipsum dolor sit.", checked: false },
      ],
      buttonText: "Buy Now",
    },
    {
      type: "Premium",
      price: "49.99$",
      features: [
        { text: "Lorem ipsum dolor sit.", checked: true },
        { text: "Lorem ipsum dolor sit.", checked: true },
        { text: "Lorem ipsum dolor sit.", checked: true },
        { text: "Lorem ipsum dolor sit.", checked: true },
        { text: "Lorem ipsum dolor sit.", checked: true },
      ],
      buttonText: "Buy Now",
    },
  ];

  return (
    <div className="container">
      <div className="pricing-cards">
        {pricingCards.map((card, index) => (
          <PricingCard {...card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default App;
