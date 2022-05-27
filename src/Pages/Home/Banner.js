import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../../images/banner1.jpg'

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{
            background: `url(${bg})`,
            backgroundSize: 'cover'
        }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Engrave Any Knife</h1>
                    <p className="mb-5">We are factory authorized dealers for almost every brand we carry. Some of these lines are only sold to reputable dealers, giving you comfort and peace of mind knowing you're buying from a real store with real inventory, and a proven track record of service.</p>
                    <Link to='product'><button className="btn btn-primary">Get Started</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;