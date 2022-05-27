import React, { useEffect, useState } from 'react';
import SingleReviewNav from './SingleReviewNav';


const ReviewsNav = () => {
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
    return (
        <div >
            <h1 className='text-center text-2xl font-bold text-primary mb-4 mx-auto'>Reviews</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 pb-28 px-12'>
                {
                    reviews?.map(review => <SingleReviewNav key={review._id} review={review}></SingleReviewNav>)
                }
            </div>
        </div>
    );
};

export default ReviewsNav;