import React from 'react'

const Success = () => {
  const facturaUrl = localStorage.getItem('factura')

  return (
    <div className="container text-center my-5">
      <h2 className="text-success">✅ ¡Pago exitoso!</h2>
      <p>Gracias por tu compra. Puedes descargar tu factura aquí:</p>
      {facturaUrl && (
        <a href={facturaUrl} className="btn btn-primary" download>
          Descargar factura PDF
        </a>
      )}
    </div>
  )
}

export default Success
