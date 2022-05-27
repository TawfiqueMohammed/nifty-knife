import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PartsInfo from './PartsInfo';

const Parts = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [availableProducts, setavailableProducts] = useState([]);
    useEffect(() => {
        fetch("https://fierce-refuge-65339.herokuapp.com/products", {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setavailableProducts(data))
    }, []);

    const handleShowmore = () => {
        navigate('/products')
    }

    return (
        <div>
            <div className='py-20 '>
                <h1 className='text-primary text-center font-bold text-3xl mb-3 uppercase'>OUR PRODUCTS</h1>
                <h1 className='text-center text-2xl'>Products We Provide</h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 pb-28 px-12'>
                {
                    availableProducts.slice(0, 6).map(availableProduct => <PartsInfo
                        key={availableProduct._id}
                        availableProduct={availableProduct}
                        setProduct={setProduct}
                    ></PartsInfo>)
                }
            </div>
            <div className='mb-12 text-center'>
                <button className='btn btn-primary text-center text-primary' onClick={() => handleShowmore()}>Show More Products</button>
            </div>
        </div>
    );
};

export default Parts;