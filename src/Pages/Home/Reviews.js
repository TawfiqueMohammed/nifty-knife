import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleReview from './SingleReview';

const Reviews = () => {
    const navigate = useNavigate()

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch(`https://fierce-refuge-65339.herokuapp.com/reviews`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    console.log(reviews);

    const handleShowmore = () => {
        navigate('/reviews')
    }


    return (
        <div >
            <h1 className='text-center text-4xl font-bold text-primary m-4 mx-auto'>User Reviews</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 pb-28 px-12 pt-5'>
                {
                    reviews?.slice(0, 3).map(review => <SingleReview key={review._id} review={review}></SingleReview>)
                }
            </div>
            <div className='mb-12 text-center'>
                <button className='btn btn-primary text-white' onClick={() => handleShowmore()}>Show More Reviews</button>
            </div>
        </div>
    );
};

export default Reviews;