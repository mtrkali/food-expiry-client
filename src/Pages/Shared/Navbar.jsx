import React from 'react';
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to=''>Fridge</NavLink></li>
        <li><NavLink to=''>AddFood</NavLink></li>
        <li><NavLink to=''>MyItems</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img className='w-16 h-16 rounded-full' src={logo} alt="" />

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='login'><a className="btn btn-secondary text-xs mr-2">Login</a></Link>
                <Link to='register'><a className="hidden md:flex lg:flex btn btn-primary text-xs">Register</a></Link>
            </div>
        </div>
    );
};

export default Navbar;