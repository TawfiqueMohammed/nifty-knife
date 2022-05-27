import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import DeleteOrder from './DeleteOrder';
import SingleProduct from './SingleProduct';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading'


const MyOrders = () => {
    // const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);
    const [deleteOrder, setdeleteOrder] = useState(null);

    // useEffect(() => {
    //     fetch(`https://fierce-refuge-65339.herokuapp.com/orders?email=${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => setProducts(data));
    // }, [user])

    const { data: products, isLoading, refetch } = useQuery('orders', () => fetch(`https://fierce-refuge-65339.herokuapp.com/orders?email=${user?.email}`,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
    );

    if (isLoading) {
        return <Loading></Loading>
    }



    console.log(products);
    return (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Payment status</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Order Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => <SingleProduct key={product._id}
                                index={index}
                                product={product} products={products}
                                // setProducts={setProducts}
                                setdeleteOrder={setdeleteOrder}
                                refetch={refetch}
                            >
                            </SingleProduct>)
                        }
                    </tbody>
                </table>
                {
                    deleteOrder && <DeleteOrder
                        products={products}
                        // setProducts={setProducts}
                        deleteOrder={deleteOrder}
                        setdeleteOrder={setdeleteOrder}
                        refetch={refetch}
                    ></DeleteOrder>
                }
            </div>

        </div >
    );
};

export default MyOrders;