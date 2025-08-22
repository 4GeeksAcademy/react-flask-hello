import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { StripeService } from '../components/stripe/StripeIntegration';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setVerificationStatus('error');
      return;
    }

    // Verificar la sesión con Stripe
    const verifyPayment = async () => {
      try {
        const sessionData = await StripeService.verifySession(sessionId);
        
        if (sessionData.payment_status === 'paid') {
          setVerificationStatus('success');
          setPaymentDetails(sessionData);
          
          // Limpiar el carrito tras pago exitoso
          dispatch({ type: "clearCarro" });
          localStorage.removeItem("carro");
          
          // Opcional: Guardar en historial
          const nuevaCompra = {
            fecha: new Date().toLocaleString(),
            sessionId: sessionId,
            total: sessionData.amount_total / 100, // Convertir de centavos
            currency: sessionData.currency,
            status: 'completed'
          };
          
          const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
          historial.push(nuevaCompra);
          localStorage.setItem("historialCompras", JSON.stringify(historial));
          
        } else {
          setVerificationStatus('pending');
        }
      } catch (error) {
        console.error('Error al verificar pago:', error);
        setVerificationStatus('error');
      }
    };

    verifyPayment();
  }, [searchParams, dispatch]);

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Verificando tu pago...
            </h2>
            <p className="text-gray-600">
              Por favor espera mientras confirmamos tu transacción.
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="text-green-500 mb-6">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Pago Exitoso!
            </h2>
            <p className="text-gray-600 mb-6">
              Tu pago ha sido procesado correctamente.
            </p>
            {paymentDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Monto:</strong> €{(paymentDetails.amount_total / 100).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Estado:</strong> Pagado
                </p>
              </div>
            )}
            <div className="space-y-3">
              <Link 
                to="/historial" 
                className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Ver Historial de Compras
              </Link>
              <Link 
                to="/" 
                className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        );

      case 'pending':
        return (
          <div className="text-center">
            <div className="text-yellow-500 mb-6">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Pago Pendiente
            </h2>
            <p className="text-gray-600 mb-6">
              Tu pago está siendo procesado. Te notificaremos cuando se complete.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        );

      case 'error':
      default:
        return (
          <div className="text-center">
            <div className="text-red-500 mb-6">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Error al Verificar Pago
            </h2>
            <p className="text-gray-600 mb-6">
              Hubo un problema al verificar tu pago. Por favor contacta a soporte.
            </p>
            <div className="space-y-3">
              <Link 
                to="/carro" 
                className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Volver al Carrito
              </Link>
              <Link 
                to="/" 
                className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {renderContent()}
      </div>
    </div>
  );
};