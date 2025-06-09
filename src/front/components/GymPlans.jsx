import React from 'react';
import "../../styles/GymPlans.css";

const GymPlans = () => {
  const plans = [
    {
      title: 'Tarifa Basic',
      price: '45€',
      description: 'Pack entrenamientos',
    },
    {
      title: 'Tarifa Premium',
      price: '55€',
      description: 'Pack nutricion',
    },
    {
      title: 'Tarifa DMPC',
      price: '65€',
      description: 'Pack Completo',
    },
  ];

  return (
    <div className="plans-container">
      {plans.map((plan, index) => (
        <div className="plan-card" key={index}>
          <h2 className="plan-title">{plan.title}</h2>
          <p className="plan-price">{plan.price}</p>
          <p className="plan-description">{plan.description}</p>
          <button className="plan-button">Elegir plan</button>
        </div>
      ))}
    </div>
  );
};

export default GymPlans;
