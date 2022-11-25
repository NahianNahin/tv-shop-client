import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../shared/Header';

const DashBoardLayouts = () => {
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-slate-100">
                    <Outlet></Outlet>
                    

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                       
                        <li><Link to='/dashboard' className='font-semibold'>My Order</Link></li>
                        <li><Link to='/dashboard/add_product' className='font-semibold'>Add Product</Link></li>
                        <li><Link to='/dashboard/all_seller' className='font-semibold'>All Sellers</Link></li>
                        <li><Link to='/dashboard/all_buyer' className='font-semibold'>All Buyers</Link></li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayouts;