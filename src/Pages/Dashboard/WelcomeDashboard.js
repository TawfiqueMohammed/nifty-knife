import React from 'react';
import { Outlet } from 'react-router-dom';

const WelcomeDashboard = () => {
    return (
        <div className='drawer drawer drawer-mobile'>
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className='drawer-content '>
                <h2 className='text-4xl text-primary font-extrabold m-10'>Welcome to your Dashboard</h2>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default WelcomeDashboard;