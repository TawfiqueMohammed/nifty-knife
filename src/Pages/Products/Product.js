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
        <div className="card w-96 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Part" className="rounded-xl" />
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





// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Product = ({ product }) => {
//     const { _id, name, price, description, quantity, minimumQuantity, img } = product;
//     const navigate = useNavigate();

//     const navigateToServiceDetail = id => {
//         navigate(`/service/${id}`)
//     }
//     return (
//         <div className="card lg:max-w-lg bg-base-100 shadow-xl">
//             <div className="card-body text-center">
//                 <h2 className="text-xl font-bold text-secondary">{name}</h2>
//                 <div className='flex justify-center'>
//                     <img className='w-5/12' src={img} alt="" ></img>
//                 </div>
//                 {/* <p>{
//                     slots.length > 0
//                         ? <span>{slots[0]}</span>
//                         : <span className='text-red-500'>Try another date.</span>
//                 }</p>
//                 <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p> */}
//                 <p>Price: ${price}</p>
//                 <p><small>Description: {description}</small></p>
//                 <p><small>Quantity: {quantity}</small></p>
//                 <p><small>Minimum Order Quantity: {minimumQuantity}</small></p>
//                 <div className="card-actions justify-center">
//                     <label className='btn btn-primary text-primary' onClick={() => navigateToServiceDetail(_id)}
//                     // htmlFor="booking-modal"
//                     // disabled={slots.length === 0}
//                     // onClick={() => setTreatment(service)}
//                     // className="btn btn-sm btn-secondary text-primary uppercase bg-gradient-to-r from-secondary to-primary"
//                     >Purchase: {name}</label>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Product;