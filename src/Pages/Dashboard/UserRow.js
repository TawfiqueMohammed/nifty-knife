import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user, refetch, index }) => {
    const { name, email, role } = user;
    const makeAdmin = () => {
        fetch(`http://localhost:5000/users/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data)
                    refetch();
                    toast.success(`Successfully made an admin`)
                }
            })
    }

    const removeAdmin = () => {
        fetch(`http://localhost:5000/user/removeAdmin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error(`Failed to Remove  admin`);
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully removed admin`);
                }

            })
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role !== 'admin' && <button className='btn btn-xs' onClick={makeAdmin}>Make Admin</button>}</td>


            <td><button onClick={() => removeAdmin()} className='btn btn-xs text-red-500'>Remove Admin</button></td>
        </tr >
    );
};

export default UserRow;