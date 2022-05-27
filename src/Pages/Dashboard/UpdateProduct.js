import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';

const UpdateProduct = () => {
    const { id } = useParams();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorage_key = process.env.REACT_APP_imageStorage_key;

    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch(`https://fierce-refuge-65339.herokuapp.com/products?id=${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [])

    console.log(product);
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
                    const updatedProduct = {
                        name: product[0]?.name,
                        description: product[0]?.description,
                        price: data.price,
                        minimumQuantity: data.minimumQuantity,
                        quantity: data.quantity,
                        img: img
                    }
                    console.log(product);
                    fetch(`https://fierce-refuge-65339.herokuapp.com/products/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(updatedProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success(`${product[0]?.name} have been updated`)
                        });
                }
                console.log(data);
                // reset();
            })
    }
    return (
        <div>
            <h2 className='text-3xl font-bold my-4'>Update Product : <b>{product[0]?.name}</b></h2>

            <div style={{ margin: "0 0 1050px 0" }} className="page-add">
                <div className="container-add">
                    <div className="grid align-center justify-center">
                        <form onSubmit={handleSubmit(onSubmit)}>

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
                                            message: 'Minimum Quantity is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.quantity.message}</span>}
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
                                <input className='btn btn-secondary text-white' type="submit" value="Update" />
                            </div>

                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default UpdateProduct;