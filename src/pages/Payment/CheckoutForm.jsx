import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutForm = ({price,sessionId, sessionData, onPaymentSuccess }) => {

    const {
        title,
        description,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        duration,
        tutorName,
        tutorEmail,
        registrationFee,
      } = sessionData;

    const stripe =useStripe();
    const elements=useElements();

    const [error,setError]=useState("");
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');

    const axiosSecure =useAxiosSecure();
    const{user}=useAuth();
 

    useEffect(()=>{

            axiosSecure.post('/create-payment-intent', { price})
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        
      

    },[axiosSecure,price])

    const handleSubmit = async(event)=>{
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error',confirmError)
        }
        else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the booking in the database
                const bookingData = {
                    sessionId,
                    studentEmail: user?.email,
                    title,
                    description,
                    registrationStartDate,
                    registrationEndDate,
                    classStartDate,
                    classEndDate,
                    duration,
                    registrationFee,
                    tutorName,
                    tutorEmail,
                    paymentIntent: paymentIntent.id,
                }

                // console.log('Booking data sent to server:', bookingData);



                const res = await axiosSecure.post('/bookedSession', bookingData);
                // console.log('payment saved', res.data);
                // refetch();
                if (res.data?.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thank you for payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                
                }

            }
        }
    }


    return (
        <form onSubmit={handleSubmit}>
        <CardElement className='lg:px-40 py-10 '
            options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
        />
        <button className="btn bg-[#a054f4] text-white font-bol my-4 px-40" type="submit"  >
            Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}

    </form>

    );
};

export default CheckoutForm;