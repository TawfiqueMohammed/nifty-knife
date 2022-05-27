import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const SingleProduct = (props) => {
    const { products, setProducts, index, setdeleteOrder } = props;
    const { name, description, img, paid, price, quantity, _id, status, totalPrice, transactionId } = props.product;


    const deleteProduct = () => {
        const url = `http://localhost:5000/orders?id=${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    const remaining = products.filter(item => item._id !== _id);
                    toast.success('Order successfully deleted');
                    setProducts(remaining);
                }
            })
    }



    return (

        <tr>
            <th>{index + 1}</th>
            <td>
                <div className="avatar">
                    <div className="w-16 rounded">
                        <img src={img} alt={name} />
                    </div>
                </div>
            </td>
            <td>
                {name}
            </td>
            <td>
                {
                    !paid ? <Link to={`/dashboard/payment/${props.product._id}`}><button className='btn btn-xs btn-success text-white'>Pay</button></Link>
                        : <div><h4 className='card__title'>Payment: <span className='text-success'>Paid</span></h4><p>Transaction ID : <span className='text-success'>{transactionId}</span></p></div>

                }
                {
                    paid && status === 'Pending' ? <h4 className='card__title'>Status: <span className='text-danger'>{status}</span></h4>
                        : <h4 className='card__title'>Status: <span className='text-success'>{status}</span></h4>
                }
            </td>
            <td><b>${totalPrice}</b> </td>
            <td>{quantity}</td>
            <td>{
                !paid && <label onClick={() => setdeleteOrder(props.product)} for="my-modal-6" className="btn btn-xs btn-error">Delete</label>
            }</td>
        </tr>

    );
};

export default SingleProduct;




