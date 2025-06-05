
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../components/checkoutform';

export const Checkout = () => {
	//la clave en .env!!! ----------- esta de abajo es la clave publica
	const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
	
	
	return (
		<div className="text-center mt-5">
			<h1>Stripe implementation</h1>
			<Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</div>
	);
};