import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Loading from '../Shared/Loading';
// import { CardElement, Elements, useElements, useStripe } from '../../src';



const stripePromise = loadStripe('pk_test_51L2fC3L2pDnG4c3S9ZegRSSPyTOLwgorC8pIpPDhTw4F5SgDd4gDi62ln5Rt17BAH7b7AWFvFRYrRhW489IQfvTh00tCz7nFjR');


const Payment = () => {
    const { id } = useParams();
    const url = `https://fierce-refuge-65339.herokuapp.com/orders/${id}`;
    const { data: orders, isLoading } = useQuery(['orders', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>


            <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div className="card-body">
                    <p className="text-primary text-xl font-bold">Hello ! {orders.userName}</p>
                    <h2 className="card-title">Pay for {orders.name}</h2>
                    <p>Please pay : <span className='font-bold text-neutral text-xl'>${orders.totalPrice}</span></p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            orders={orders}
                        />
                    </Elements>
                </div>
            </div>
        </div>

    );
};

export default Payment;