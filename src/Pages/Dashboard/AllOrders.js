import React, { useEffect, useState } from 'react';
import DeleteOrdersForAdmin from './DeleteOrdersForAdmin';
import ManageIndividualOrders from './ManageIndividualOrders';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';

const AllOrders = () => {
    const [deleteOrders, setDeleteOrders] = useState(null);

    // const [orders, setOrders] = useState([]);
    // useEffect(() => {
    //     fetch('https://fierce-refuge-65339.herokuapp.com/orders')
    //         .then(res => res.json())
    //         .then(data => setOrders(data));
    // }, [])

    const { data: orders, setOrders, isLoading, refetch } = useQuery('orders', () => fetch('https://fierce-refuge-65339.herokuapp.com/orders', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }

    })
        .then(res => res.json())
    );
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className=''>
            <h2 className='text-2xl text-primary font-bold my-4'>All Orders</h2>
            <div className="overflow-x-auto">
                <table className="table  table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>User Email</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Shipment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <ManageIndividualOrders key={order._id}
                                index={index}
                                order={order}
                                orders={orders}
                                setOrders={setOrders}
                                setDeleteOrders={setDeleteOrders}
                                refetch={refetch}
                            ></ManageIndividualOrders>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteOrders && <DeleteOrdersForAdmin
                    deleteOrders={deleteOrders}
                    setDeleteOrders={setDeleteOrders}
                    refetch={refetch}
                ></DeleteOrdersForAdmin>

            }
        </div>
    );
};

export default AllOrders;