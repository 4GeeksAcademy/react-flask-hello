import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";



const PaymentComponent = () => {

  const generateUniqueOrderID = () => {
    const currentDate = new Date();
    const randomSuffix = Math.floor(Math.random() * 1000); // Genera un número aleatorio entre 0 y 999
    const orderID = `ORDER-${currentDate.getTime()}-${randomSuffix}`;
    return orderID;
  }

  const orderID = generateUniqueOrderID()

  const createOrder = async (data) => {
    // Order is created on the server and the order id is returned
    const user_id = localStorage.getItem('user_id')
    const backendUrl = process.env.BACKEND_URL + `/api/payment/create-paypal-order/${user_id}`;
    return await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities 
      body: JSON.stringify({
        orderID: orderID,
        articles: ['art1', 'art2'],
        cost: '2.499.99'
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = async (data) => {
    // Order is captured on the server and the response is returned to the browser
    const user_id = localStorage.getItem('userID')
    const backendUrl = process.env.BACKEND_URL + `api/payment/capture-paypal-order/${user_id}`;
    return await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log('Successfully payment:', responseData);
      })
      .catch((error) => {
        // console.error('Error capturing payment:', error);
      });
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}



export default PaymentComponent