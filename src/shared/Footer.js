import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AuthContext } from '../contexts/AuthProvider';


const Footer = () => {
    const { logout, user } = useContext(AuthContext);
    return (
        <footer className="footer items-center p-4  bg-white text-black border-t-2 pt-10 pl-20 mb-20">
            <div className="">
                <img src={logo} alt="" className='w-auto h-20 -ml-10' />
                <p><span className='text-lg font-semibold'>TV <span className='text-primary font-bold'>Shop</span></span><br />Providing Services since 2018</p>
                <p>Copyright © 2022 - All right reserved</p>
            </div>
            <div>
                <span className="footer-title">Pages</span>
                <Link to='/' className="link link-hover">Home</Link>
                <Link to='/all_products' className="link link-hover">All Products</Link>
                <Link to='/dashboard' className="link link-hover">Dashboard</Link>
                <Link to='/blogs' className="link link-hover">Blogs</Link>
            </div>
            <div>
                <span className="footer-title">Important Links</span>
                {!user?.uid
                    ?
                    <>
                        <Link to='/signup' className="link link-hover">Sign Up</Link>
                        <Link to='/login' className="link link-hover">Log In</Link>
                    </>
                    :
                    <Link ><button className="" onClick={logout}>Sign Out</button></Link>
                }


            </div>
        </footer>
    );
};

export default Footer;