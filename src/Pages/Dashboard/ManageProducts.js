import React, { useEffect, useState } from 'react';
import DeleteIndividualItem from './DeleteIndividualItem';
import ManageIndividualProduct from './ManageIndividualProduct';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';



const ManageProducts = () => {
    // const [products, setProducts] = useState([]);
    const [deleteItem, setDeleteItem] = useState(null);
    // useEffect(() => {
    //     fetch(`http://localhost:5000/products`, {
    //         method: 'GET',
    //         headers: {
    //             'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    const { data: products, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    console.log(products);
    return (
        <div >
            <div>
                <h2 className='text-2xl text-primary mb-4 font-bold'>Manage Products</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Minimum Quantity</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => <ManageIndividualProduct
                                key={product._id}
                                product={product}
                                index={index}
                                setDeleteItem={setDeleteItem}
                                // products={products}
                                // setProducts={setProducts}
                                refetch={refetch}
                            >

                            </ManageIndividualProduct>)
                        }
                    </tbody>
                </table>
                {
                    deleteItem && <DeleteIndividualItem
                        deleteItem={deleteItem}
                        setDeleteItem={setDeleteItem}
                        refetch={refetch}
                    ></DeleteIndividualItem>

                }
            </div>
        </div>
    );
};

export default ManageProducts;
