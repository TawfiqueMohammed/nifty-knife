import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const ManageIndividualOrders = (props) => {
    const { orders, setOrders, index, setDeleteOrders, refetch } = props;
    const { name, description, price, totalPrice, quantity, productCode, img, status, _id, paid, email, userName, address, phone } = props.order;


    const changeStatus = () => {

        const updatedProduct = {
            name, description, price, totalPrice, quantity, productCode, img, status: 'Shipped', userName, address, phone, email
        }

        fetch(`https://fierce-refuge-65339.herokuapp.com/orders?id=${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i]._id === _id) {
                        orders[i].status = 'Shipped';
                        console.log(orders[i]);
                    }
                }
                refetch();
                toast.success(`Status is updated`);


            })

        // fetch(`https://fierce-refuge-65339.herokuapp.com/orders`, {
        //     method: 'GET',
        //     headers: {
        //         'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         setOrders(data)
        //         refetch();
        //     })
    }



    return (
        <tr>
            <th>{index + 1}</th>
            <td><div className="avatar">
                <div className="w-16 rounded">
                    <img src={img} alt={name} />
                </div>
            </div></td>
            <td>{name}</td>
            <td>{
                !paid ? <h4 className='card__title'>Payment: <span className='text-danger'>Pending</span></h4>
                    : <h4 className='card__title'>Payment: <span className='text-success'>Paid</span></h4>
            }
                {
                    status === 'Pending' ? <h4 className='card__title'>Status: <span className='text-danger'>{status}</span></h4>
                        : <h4 className='card__title'>Status: <span className='text-success'>{status}</span></h4>
                }</td>
            <td>{email}</td>
            <td>{quantity}</td>
            <td>{totalPrice}</td>
            <td>{
                status === 'Pending' && <div className="col-12">
                    <button onClick={() => changeStatus()} className='btn btn-warning '>Shipped</button>
                </div>
            }</td>
            <td>
                <label onClick={() => setDeleteOrders(props.order)} for="my-modal-6" className="btn btn-xs btn-error">Delete</label>
            </td>


        </tr>
    );
};

export default ManageIndividualOrders;


