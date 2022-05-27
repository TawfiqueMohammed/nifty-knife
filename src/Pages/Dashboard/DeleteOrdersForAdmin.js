import React from 'react';
import { toast } from 'react-toastify';

const DeleteOrdersForAdmin = ({ deleteOrders, setDeleteOrders, refetch }) => {
    const { _id, name, userName, totalPrice, quantity } = deleteOrders;

    const deleteProduct = () => {
        const url = `https://fierce-refuge-65339.herokuapp.com/orders?id=${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success('Successfully Deleted');
                    setDeleteOrders(null);
                    refetch();
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete {name} ordered by {userName} ?</h3>
                    <p className="py-4"><b>Quantity:</b>{quantity}</p>
                    <p className="py-4"><b>Price:</b>{totalPrice}</p>
                    <div className="my-modal-6">
                        <button onClick={() => deleteProduct()} className="btn btn-xs btn-error mr-4">Delete</button>
                        <label for="my-modal-6" className="btn btn-xs">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteOrdersForAdmin;