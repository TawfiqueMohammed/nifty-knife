import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { useForm } from 'react-hook-form';


import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';


const Purchase = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [newUser, setNewUser] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setNewUser(data))
    }, [user]);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/products?&id=${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    // console.log(products);
    const url = `http://localhost:5000/products?&id=${id}`;
    const { data: item, isLoading } = useQuery(['products', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    const onSubmit = async data => {
        console.log(data);

        const prevQuantity = parseInt(item[0]?.quantity);
        const newQuantity = parseInt(data.quantity);
        const minimumQuantity = parseInt(item[0]?.minimumQuantity);

        if (data.quantity === '' || data.quantity === undefined) {
            return toast.error('Empty Quantity');
        }

        if (newQuantity > prevQuantity) {
            return toast.error('Product cannot be purchased for product shortage');
        }

        if (newQuantity < minimumQuantity) {
            return toast.error('Minimum Quantity Required');
        }





        const product = {
            userName: data.userName,
            phone: data.phone,
            address: data.address,
            name: item[0]?.name,
            email: user?.email,
            description: item[0]?.description,
            price: item[0]?.price,
            totalPrice: parseInt(parseInt(newQuantity) * parseInt(item[0]?.price)),
            quantity: newQuantity,
            minimumQuantity: item[0].minimumQuantity,
            img: item[0].img,
            status: 'Pending',
            paid: false
        }

        const oldProduct = {
            name: item[0]?.name,
            description: item[0]?.description,
            price: item[0]?.price,
            minimumQuantity: item[0].minimumQuantity,
            quantity: parseInt(prevQuantity - newQuantity),
            img: item[0].img,
        }

        fetch(`http://localhost:5000/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Order Placed');
            });

        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(oldProduct)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`${product?.name} have been updated`)
            });
        reset();
    }

    return (



        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 align-center my-8 justify-around">

            <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                <figure><img src={item[0].img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title"><b>Product Name:</b>{item[0]?.name}</h2>
                    <p><b>Details:</b> {item[0]?.description}</p>
                    <p><b>Minimum Product Required:</b> {item[0]?.minimumQuantity}</p>
                    <p className='justify-start'><b>Price:</b> ${item[0]?.price}</p>


                </div>
            </div>




            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-group w-75 my-auto  form-control">
                    <label className="label">
                        <span className="label-text">Customer's Name</span>
                    </label>
                    <input
                        type="text"
                        value={newUser[0]?.name} readOnly
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("userName")}
                    />
                </div>

                <div className="input-group w-75 mx-auto form-control">
                    <label className="label">
                        <span className="label-text">Customer's Email</span>
                    </label>
                    <input
                        type="text"
                        value={user?.email} readOnly
                        placeholder="Your Email"
                        className="input input-bordered w-full max-w-xs"
                        {...register("email")}
                    />
                </div>

                <div className="input-group w-75 mx-auto form-control">
                    <label className="label">
                        <span className="label-text">Customer's Phone Number</span>
                    </label>
                    <input
                        type="text"
                        value={newUser[0]?.phone}
                        placeholder="Your Phone Number"
                        className="input input-bordered w-full max-w-xs"
                        {...register("phone")}
                    />
                </div>

                <div className="input-group w-75 mx-auto form-control">
                    <label className="label">
                        <span className="label-text">Customer's Address</span>
                    </label>
                    <textarea
                        type="text"
                        placeholder="Your Address"
                        className="input input-bordered w-full max-w-xs"
                        {...register("address")}
                    />
                </div>

                <div className="input-group w-75 mx-auto form-control">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input
                        type="text"
                        value={item[0]?.name} readOnly
                        placeholder="Product Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name")}
                    />
                </div>

                <div className="input-group w-75 mx-auto form-control">
                    <label className="label">
                        <span className="label-text">Price Per Unit $</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Product Price"
                        value={item[0]?.price} readOnly
                        className="input input-bordered w-full max-w-xs"
                        {...register("price")}
                    />
                </div>

                <div className="input-group w-75 mx-auto form-control">
                    <label className="label">
                        <span className="label-text">Stored Quantity</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Product Quantity"
                        value={item[0]?.quantity} readOnly
                        className="input input-bordered w-full max-w-xs"
                        {...register("prevQuantity")}
                    />
                </div>

                <div className="input-group w-75 mx-auto form-control">
                    <label className="label">
                        <span className="label-text">Quantity you want</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Product Quantity"
                        min={1}

                        className="input input-bordered w-full max-w-xs"
                        {...register("quantity")}
                    />
                    <label className="label">
                        {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.prevQuantity.message}</span>}
                    </label>
                </div>
                <button className='grid justify-start'>
                    <input className='btn btn-secondary ' type="submit" value="Purchase" />
                </button>
            </form>

        </div>



    );
};
export default Purchase;