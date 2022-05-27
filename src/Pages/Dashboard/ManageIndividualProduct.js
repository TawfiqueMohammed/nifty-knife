import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageIndividualProduct = (props) => {
    const { products, setProducts, setDeleteItem, index } = props;
    const { name, description, price, quantity, productCode, img, minimumQuantity, status, _id } = props.product;
    const navigate = useNavigate();



    const goTo = () => {
        navigate(`/updateProduct/${_id}`);
    }

    return (
        <tr>

            <th>{index + 1}</th>
            <td><div className="avatar">
                <div className="w-16 rounded">
                    <img src={img} alt={name} />
                </div>
            </div>
            </td>
            <td>{name}</td>
            <td>{price}</td>
            <td>{quantity}</td>
            <td>{minimumQuantity}</td>
            <td><button className='btn btn-primary text-white' variant="primary" onClick={() => goTo()}>
                Update Product
            </button></td>
            <td><label onClick={() => setDeleteItem(props.product)} for="my-modal-6" className="btn btn-xs btn-error">Delete</label></td>






        </tr>
    );
};

export default ManageIndividualProduct;

