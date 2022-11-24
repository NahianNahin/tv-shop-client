import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { AuthContext } from '../contexts/AuthProvider';

const Header = () => {
    const { logOut, user } = useContext(AuthContext)
    const allMenus = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blogs'>Blogs</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        {
            user && user?.uid
                ?
                <button
                    onClick={logOut}
                    className='btn bg-gradient-to-r from-primary to-secondary border-0 btn-sm m-4 text-white font-bold'>
                    Log Out
                </button>
                :
                <li><Link to='/login'>Login</Link></li>
        }

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {allMenus}
                    </ul>
                </div>
                <Link to='/' className="w-[300px]"><img src={logo} alt="" /></Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {allMenus}
                </ul>

            </div>
        </div>
    );
};

export default Header;