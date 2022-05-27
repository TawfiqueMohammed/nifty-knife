import React from 'react';
import AvailableProducts from './AvailableProducts';
import ProductsHeader from './ProductsHeader';

const Products = () => {
    return (
        <div>
            <ProductsHeader></ProductsHeader>
            <AvailableProducts></AvailableProducts>
        </div>
    );
};

export default Products;










// import React, { useEffect, useState } from 'react';
// import Product from './Product';

// const Products = () => {
//     const [product, setProduct] = useState(null);
//     const [availableProducts, setavailableProducts] = useState([]);
//     useEffect(() => {
//         fetch("http://localhost:5000/products", {
//             method: 'GET',
//             headers: {
//                 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
//             }
//         })
//             .then(res => res.json())
//             .then(data => setavailableProducts(data))
//     }, []);
//     return (
//         <div className='my-10'>
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//                 {
//                     availableProducts.map(availableProduct => <Product
//                         key={availableProduct._id}
//                         availableProduct={availableProduct}
//                         setProduct={setProduct}
//                     ></Product>)
//                 }
//             </div>

//         </div>
//     );
// };

// export default Products;