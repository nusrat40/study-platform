import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

  const {state}=useLocation();
  
  const { price, sessionId, sessionDetails} = state;
  const navigate=useNavigate();
  const [paymentIntent, setPaymentIntent] = useState(null);

//   console.log(sessionDetails);
  

  const handlePaymentSuccess = async (paymentIntentId) => {
    const response = await fetch('https://study-platform-server-gold.vercel.app/bookedSession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
           
        },
        body: JSON.stringify({
            sessionId,
            studentEmail: user.email,
            paymentIntent: paymentIntentId,
        }),
    });

    const data = await response.json();
    if (data.insertedId) {
        toast.success("Session booked successfully!");
        navigate("/sessions");
    } else {
        toast.error("Failed to book session.");
    }
};



    return (
        <div className='m-10'>
            <Helmet>
                    <title>iLearning | Payment</title>
                  </Helmet>
                  <h1 className="text-5xl font-bold text-center">
                    Payment
                  </h1>
            <Elements stripe={stripePromise}>
                    <CheckoutForm
                      price={price}
                      sessionId={sessionId}
                      sessionData={sessionDetails}
                      onPaymentSuccess={handlePaymentSuccess}
                     ></CheckoutForm>

                </Elements>

            
        </div>
    );
};

export default Payment;