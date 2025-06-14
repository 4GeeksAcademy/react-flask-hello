import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/GymPlans.css";

const GymPlans = () => {
const plans = [
  {
    title: 'Tarifa Basic',
    price: '45€',
    description: 'Pack entrenamientos',
    path: '/tarifas/basic'
  },
  {
    title: 'Tarifa Premium',
    price: '55€',
    description: 'Pack nutricion',
    path: '/tarifas/premium'
  },
  {
    title: 'Tarifa DMPC',
    price: '65€',
    description: 'Pack Completo',
    path: '/tarifas/dmpc/#'
  },
];

  return (
    <div className="plans-container">
      {plans.map((plan, index) => (
        <Link to={plan.path} key={index} className="plan-card-link">
          <div className="plan-card">
            <h2 className="plan-title">{plan.title}</h2>
            <p className="plan-price">{plan.price}</p>
            <p className="plan-description">{plan.description}</p>
            <button className="plan-button">Elegir plan</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GymPlans;
