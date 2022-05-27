import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';


import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';



const AddReviews = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user, loading] = useAuthState(auth);
    const [newUser, setNewUser] = useState([]);
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
                console.log(data);
                setNewUser(data);
            })
    }, [user])

    if (loading) {
        return <Loading></Loading>
    }

    const onSubmit = async data => {

        console.log(newUser);

        const review = {
            userName: newUser[0]?.name,
            email: newUser[0]?.email,
            img: newUser[0]?.img,
            star: data.star,
            description: data.description
        }

        fetch(`https://fierce-refuge-65339.herokuapp.com/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`Review have been added`)
            });


    }
    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    return (
        <div>
            <h2 className='text-2xl text-center font bold text-primary'>Add a review</h2>
            <div className="page-add">
                <div className="container-add">


                    <div className="right-add d-flex align-items-center justify-content-center">
                        <form className='grid justify-center align-center my-10' onSubmit={handleSubmit(onSubmit)}>

                            <div className="input-group w-100 mx-auto px-2 form-control">
                                <label className="label">
                                    <span className="label-text">Give Ratings</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Give ratings from 1-5"
                                    className="input input-bordered w-full max-w-xs"
                                    min={1}
                                    max={5}
                                    {...register("star", {
                                        required: {
                                            value: true,
                                            message: 'Product Name is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-100 mx-auto px-2 form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Product Review"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: 'Product Description is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                                </label>
                            </div>

                            <input className='btn btn-primary text-white' type="submit" value="Add Review" />
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddReviews;