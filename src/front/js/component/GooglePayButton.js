import React, { useEffect, useState } from 'react';

const GooglePayButton = ({ normalUserPrice }) => {
  const [isReadyToPay, setIsReadyToPay] = useState(false);

  const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pay.google.com/gp/p/js/pay.js';
    script.async = true;
    script.onload = onGooglePayLoaded;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getGooglePaymentsClient = () => {
    // Replace the following environment and merchant info with your own
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST",
      merchantInfo: {
        merchantName: "Example Merchant",
        merchantId: "01234567890123456789"
      },
      paymentDataCallbacks: {
        onPaymentAuthorized: onPaymentAuthorized,
        onPaymentDataChanged: onPaymentDataChanged
      }
    });

    return paymentsClient;
  };

  const onGooglePayLoaded = () => {
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
      .then(response => {
        if (response.result) {
          setIsReadyToPay(true);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onPaymentAuthorized = (paymentData) => {
    return new Promise(function (resolve, reject) {
      // handle the response
      processPayment(paymentData)
        .then(function () {
          resolve({ transactionState: 'SUCCESS' });
        })
        .catch(function () {
          resolve({
            transactionState: 'ERROR',
            error: {
              intent: 'PAYMENT_AUTHORIZATION',
              message: 'Insufficient funds',
              reason: 'PAYMENT_DATA_INVALID'
            }
          });
        });
    });
  };

  const onPaymentDataChanged = (intermediatePaymentData) => {
    return new Promise(function (resolve, reject) {
      let shippingAddress = intermediatePaymentData.shippingAddress;
      let shippingOptionData = intermediatePaymentData.shippingOptionData;

      // Vérifier si les informations de livraison sont complètes et valides
      const isShippingAddressValid = validateShippingAddress(shippingAddress);

      if (!isShippingAddressValid) {
        // Si l'adresse de livraison n'est pas valide, retourner une erreur
        reject({
          error: {
            intent: 'SHIPPING_ADDRESS',
            message: 'Adresse de livraison invalide',
            reason: 'SHIPPING_ADDRESS_INVALID',
          },
        });
        return;
      }

      // Calculer le montant total en fonction des éléments de commande
      const totalPrice = calculateTotalPrice(normalUserPrice);

      // Mettre à jour les options de livraison en fonction de l'adresse de livraison
      const updatedShippingOptions = getUpdatedShippingOptions(shippingAddress);

      // Mettre à jour les informations de paiement en fonction des changements
      const paymentDataRequestUpdate = {
        newTransactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: totalPrice.toFixed(2),
          totalPriceLabel: 'Total',
        },
        newShippingOptions: updatedShippingOptions,
      };

      resolve(paymentDataRequestUpdate);
    });
  };

  // Fonction de validation de l'adresse de livraison
  const validateShippingAddress = (address) => {
    // Vérifier si l'adresse est complète et valide
    // Vous pouvez mettre en place ici votre propre logique de validation
    return true;
  };

  // Fonction de calcul du montant total en fonction des éléments de commande
  const calculateTotalPrice = (normalUserPrice) => {
    // Vous pouvez ajouter ici toute logique de calcul du montant total
    const tax = parseFloat(normalUserPrice) * 0.1;
    return parseFloat(normalUserPrice) + tax;
  };

  // Fonction pour récupérer les options de livraison mises à jour en fonction de l'adresse de livraison
  const getUpdatedShippingOptions = (shippingAddress) => {
    // Vous pouvez ajouter ici toute logique pour déterminer les options de livraison en fonction de l'adresse
    const shippingOptions = [
      { id: 'standard', label: 'Standard Shipping', amount: '0.00' },
      { id: 'express', label: 'Express Shipping', amount: '5.00' },
    ];
    return shippingOptions;
  };

  const getGoogleIsReadyToPayRequest = () => {
    return {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'],
        },
      }],
    };
  };

  const getGoogleTransactionInfo = () => {
    const tax = (parseFloat(normalUserPrice) * 0.1).toFixed(2);

    return {
      displayItems: [
        {
          label: "Subtotal",
          type: "SUBTOTAL",
          price: normalUserPrice.toString(),
        },
        {
          label: "Tax",
          type: "TAX",
          price: tax,
        },
      ],
      countryCode: 'US',
      currencyCode: "USD",
      totalPriceStatus: "FINAL",
      totalPrice: (parseFloat(normalUserPrice) + parseFloat(tax)).toFixed(2),
      totalPriceLabel: "Total",
    };
  };

  const onGooglePaymentButtonClicked = () => {
    const paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.loadPaymentData(paymentDataRequest);
  };

  const getGooglePaymentDataRequest = () => {
    const paymentDataRequest = Object.assign({}, baseRequest);
    // Définir la méthode de paiement, par exemple : 'CARD', 'PAYPAL'
    paymentDataRequest.allowedPaymentMethods = ['CARD'];
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
    paymentDataRequest.merchantInfo = {
      merchantName: 'Example Merchant',
    };

    return paymentDataRequest;
  };

  return (
    <div>
      {isReadyToPay && (
        <button onClick={onGooglePaymentButtonClicked}>Compra con Google Pay</button>
      )}
    </div>
  );
};

export default GooglePayButton;
