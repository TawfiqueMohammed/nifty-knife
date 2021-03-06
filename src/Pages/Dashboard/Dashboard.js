import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);

    const [admin] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <h2 className='text-4xl text-primary font-extrabold m-10 text-center'>Welcome to your Dashboard</h2>
                <Outlet></Outlet>


            </div>
            <div className="drawer-side ">
                <label for="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-base-100  text-primary bg-primary">
                    {/* <!-- Sidebar content here --> */}
                    <li className='text-white'><Link to="/dashboard">My Profile</Link></li>
                    {
                        !admin && <>
                            <li className='text-white'><Link to="/dashboard/myOrders">My Orders</Link></li>
                            <li className='text-white'><Link to="/dashboard/review">Add a Review</Link></li>
                        </>
                    }


                    {
                        admin && <>
                            <li className='text-white'><Link to="/dashboard/allOrders">All Orders</Link></li>
                            <li className='text-white'><Link to="/dashboard/addProduct">Add Product</Link></li>
                            <li className='text-white'><Link to="/dashboard/manageProducts">Manage Products</Link></li>
                            <li className='text-white'><Link to="/dashboard/users">Users</Link></li>
                        </>
                    }

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;