import React from 'react';
import { useForm } from 'react-hook-form';

import { toast, ToastContainer } from 'react-toastify';




const AddProducts = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const onSubmit = async data => {

        // console.log(data);

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        console.log(image);
        const imageStorage_key = 'd07e4f5b15dc0ef35992fbf8cb782630';

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
                    const products = {
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        quantity: data.quantity,
                        minimumQuantity: data.minimumQuantity,
                        img: img
                    }
                    console.log(products);
                    fetch(`https://fierce-refuge-65339.herokuapp.com/products?productname=${data.name}`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(products)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                toast.success(`${products.name} have been added`)
                                console.log(data);
                            }
                            else {
                                toast.error(`Product already exist`);
                            }
                        });
                }
                console.log(data);
                // reset();
            })
    }
    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    return (
        <div>

            <div className="">
                <div className="container-add">
                    <div className="left-add">
                        <div className="text-2xl font-bold text-primary m-3">Add Products</div>
                    </div>

                    <div className=" grid align-center justify-center mx-auto my-4">
                        <form className='mx-auto' onSubmit={handleSubmit(onSubmit)}>

                            <div className="input-group w-75 mx-auto form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
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

                            <div className="input-group w-75 mx-auto form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Product Description"
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

                            <div className="input-group w-75 mx-auto form-control">
                                <label className="label">
                                    <span className="label-text">Price Per Unit $</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Product Price"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("price", {
                                        required: {
                                            value: true,
                                            message: 'Product Price is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                                </label>
                            </div>

                            <div className="input-group w-75 mx-auto form-control">
                                <label className="label">
                                    <span className="label-text">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Product Quantity"
                                    min={1}
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("quantity", {
                                        required: {
                                            value: true,
                                            message: 'Product Quantity is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.quantity.message}</span>}
                                </label>
                            </div>
                            <div className="input-group w-75 mx-auto form-control">
                                <label className="label">
                                    <span className="label-text">Minimum Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Minimum Quantity"
                                    min={1}
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("minimumQuantity", {
                                        required: {
                                            value: true,
                                            message: 'Product Quantity is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.minimumQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.quantity.message}</span>}
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

                            <div className='grid justify-start'>
                                <input className='btn btn-secondary text-primary' type="submit" value="Add Product" />
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddProducts;