import React from 'react';
import './GymPlans.css';

const GymPlans = () => {
  const plans = [
    {
      title: 'Tarifa Basic',
      price: '45€',
      description: 'Acceso al gimnasio y máquinas básicas.',
    },
    {
      title: 'Tarifa Premium',
      price: '55€',
      description: 'Incluye clases dirigidas, sauna y zona de cardio.',
    },
    {
      title: 'Tarifa DMPC',
      price: '65€',
      description: 'Todo lo anterior + asesoramiento personalizado y nutricional.',
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
