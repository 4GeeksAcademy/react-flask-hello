import React from "react";

const Pagos = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pago procesado");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Formulario de Pago</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="cardName" className="form-label">
            Nombre del Titular
          </label>
          <input
            type="text"
            className="form-control"
            id="cardName"
            placeholder=""
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">
            Número de Tarjeta
          </label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            placeholder="XXXX XXXX XXXX XXXX"
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiryDate" className="form-label">
              Fecha de Vencimiento
            </label>
            <input
              type="text"
              className="form-control"
              id="expiryDate"
              placeholder="MM/AA"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cvv" className="form-label">
              CVV
            </label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              placeholder="123"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Pagar
        </button>
      </form>
    </div>
  );
};

export default Pagos;
