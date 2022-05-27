import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const MyProfile = () => {
    const { id } = useParams()
    const [user, loading] = useAuthState(auth);
    const [newUser, setNewUser] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorage_key = process.env.REACT_APP_imageStorage_key;


    useEffect(() => {
        fetch(`https://fierce-refuge-65339.herokuapp.com/users?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setNewUser(data);
            })
    }, [user])
    if (loading) {
        return <Loading></Loading>
    }
    console.log(newUser);

    const onSubmit = async data => {

        // console.log(data);

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        console.log(image);

        const url = `https://api.imgbb.com/1/upload?key=${imageStorage_key}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    const img = result.data.url;
                    const updatedUser = {
                        name: data.name,
                        email: newUser[0]?.email,
                        address: data.address,
                        phone: data.phone,
                        password: newUser[0]?.password,
                        img: img,
                        role: newUser[0]?.role
                    }
                    console.log(updatedUser);
                    fetch(`https://fierce-refuge-65339.herokuapp.com/users?id=${newUser[0]?._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(updatedUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success(`${updatedUser?.name} profile has been updated`);
                            fetch(`https://fierce-refuge-65339.herokuapp.com/users?email=${user?.email}`, {
                                method: 'GET',
                                headers: {
                                    'content-type': 'application/json',
                                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                                }
                            })
                                .then(res => res.json())
                                .then(data => {
                                    setNewUser(data);
                                })
                        });
                }
                // console.log(data);
                reset();
            })
    }

    return (
        <div className=' min-h-screen '>
            <div className="left-add">
                <div className="text-primary text-2xl font-bold ">Update Profile</div>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 align-center gap-4 my-8 justify-around">
                <div className="card w-96 mx-auto bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={newUser[0]?.img} alt="" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Name: {newUser[0]?.name}</h2>
                        <h2 className="card-title">email: {newUser[0]?.email}</h2>
                        <p>Address: {newUser[0]?.address}</p>
                        <p>Phone: {newUser[0]?.phone}</p>


                    </div>
                </div>



                <div className="right-add flex align-center justify-center ">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="input-group w-75 mx-auto form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                min={1}
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>

                        <div className="input-group w-75 mx-auto form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Your Phone Number"
                                className="input input-bordered w-full max-w-xs"
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message: 'Phone is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                            </label>
                        </div>

                        <div className="input-group w-75 mx-auto form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Address"
                                min={1}
                                className="input input-bordered w-full max-w-xs"
                                {...register("address", {
                                    required: {
                                        value: true,
                                        message: 'Address is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.address?.type === 'required' && <span className="label-text-alt text-red-500">{errors.address.message}</span>}
                            </label>
                        </div>

                        <div className="input-group w-75 mx-auto form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input
                                type="file"
                                className="input  w-full max-w-xs"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: ' '
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.file?.type === 'required' && <span className="label-text-alt text-red-500">{errors.file.message}</span>}
                            </label>
                        </div>

                        <input className='btn btn-primary text-white' type="submit" value="Update" />
                    </form>
                </div>


            </div>
        </div>
    );
};

export default MyProfile;