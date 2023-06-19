import React from 'react';
import './Pricing.css';

function PricingCard() {
  const pricingData = [
    {
      pricing: '$0',
      symbol: 'Free plan',
      title: 'Basic',
      features: [
        '3 user requests',
        '10 downloads per day',
        'Daily content updates',
        'Fully editable files'
      ],
      buttonText: 'Choose this plan'
    },
    {
      pricing: '$19',
      symbol: 'Most popular',
      title: 'Professional',
      features: [
        '100 user requests',
        'Unlimited downloads',
        'Unlock all features from our site',
        'Daily content updates',
        'Fully editable files'
      ],
      buttonText: 'Choose this plan'
    },
    {
      pricing: '$29',
      symbol: 'For agencies',
      title: 'Enterprise',
      features: [
        'Unlimited user requests',
        'Unlimited downloads',
        'Unlock all features from our site',
        'Daily content updates',
        'Fully editable files'
      ],
      buttonText: 'Choose this plan'
    }
  ];

  const renderFeatures = (features) =>
    features.map((feature, index) => (
      <li className="card__list-item" key={index}>
        <i className="uil uil-check card__list-icon"></i>
        <p className="card__list-description">{feature}</p>
      </li>
    ));

  const renderPricingCard = ({ pricing, symbol, title, features, buttonText }, index) => (
    <article className="card__content grid" key={index}>
      <div className="card__pricing">
        <div className="card__pricing-number">
          <span className="card__pricing-symbol">{pricing}</span>
        </div>
        <span className="card__pricing-month">/Year</span>
      </div>

      <header className="card__header">
        <div className="card__header-circle grid">
          {/* <img src={require('./assets/img/free-coin.png')} alt="" className="card__header-img" /> */}
        </div>

        <span className="card__header-subtitle">{symbol}</span>
        <h1 className="card__header-title">{title}</h1>
      </header>

      <ul className="card__list grid">{renderFeatures(features)}</ul>

      <button className="card__button">{buttonText}</button>
    </article>
  );

  return (
    <section className="card container grid">
      <div className="card__container grid">{pricingData.map(renderPricingCard)}</div>
    </section>
  );
}

export default PricingCard;
