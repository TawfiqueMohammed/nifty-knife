import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ availableProduct, setProduct }) => {
    const { _id, name, img, description, price, quantity, minimumQuantity } = availableProduct;

    const navigate = useNavigate();

    const gotoPurchase = (path) => {

        setProduct(availableProduct);
        navigate(path);
    }

    return (
        <div className="card lg:max-w-lg shadow-xl border-4">
            <figure className="px-5 pt-5">
                <img src={img} alt="Part" className="rounded-xl w-full h-60" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title font-bold text-primary pb-4">{name}</h2>
                <p><b>Description:</b> {description}</p>
                <p><b>Quantity:</b> {quantity}</p>
                <p><b>Minimum Order Quantity:</b> {minimumQuantity}</p>
                <p><b>Price:</b> ${price}</p>
                <div className="card-actions">
                    <button className="btn btn-primary text-primary bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary" onClick={() => gotoPurchase(`/purchase/${_id}`)}>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;