import React from 'react';
import { Link } from 'react-router-dom';

export const Cancel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          {/* Icono de cancelación */}
          <div className="text-red-500 mb-6">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          
          {/* Título */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Pago Cancelado
          </h2>
          
          {/* Descripción */}
          <p className="text-gray-600 mb-8">
            Has cancelado el proceso de pago. Tus productos siguen en el carrito por si quieres intentarlo de nuevo.
          </p>
          
          {/* Botones */}
          <div className="space-y-3">
            <Link 
              to="/carro" 
              className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Volver al Carrito
            </Link>
            <Link 
              to="/" 
              className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Seguir Comprando
            </Link>
          </div>
          
          {/* Información adicional */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              ¿Tuviste algún problema?
            </h3>
            <p className="text-sm text-gray-600">
              Si experimentaste algún error durante el proceso de pago, no dudes en contactar a nuestro soporte.
            </p>
            <Link 
              to="/soporte" 
              className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Contactar Soporte →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};