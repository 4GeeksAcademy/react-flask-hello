import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function PayPal() {
    return (
        <PayPalScriptProvider options={{ "client-id": "AUIv8TPXdmJL92Og5f7Uu8T7YksfWS56pWMjFSnFht32ClHPxV-0I3qtS9yHi_CAf-BtLc6FJdYwrhyM"}}>
        <PayPalButtons/>
        </PayPalScriptProvider>
    );
}