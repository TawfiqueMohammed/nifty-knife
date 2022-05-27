import React from 'react';

const singleReviewNav = (props) => {

    const { userName, name, email, description, _id, img, star } = props.review;
    return (
        <div className="flex gap-4 w-96 shadow-xl py-4 px-4 ">

            <div className="avatar">
                <div className="w-24 rounded mx-auto mb-6">
                    <img src={img} alt='person'></img>
                </div>
            </div>
            <div className='grid grid-cols-1 justify-content-center align-items-center single-review'>

                <h1><b>User Name:</b>{userName}</h1>

                <p><b>Ratings:</b>{star}</p>
                <p className=''><b>Review:</b> {description}</p>
            </div>
        </div>
    );

};

export default singleReviewNav;