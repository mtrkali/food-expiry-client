import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [emUser, setEmUser] = useState(null);

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("signOut success");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        if (!user?.email) return;
        axios(`http://localhost:3000/users?email=${user?.email}`)
            .then((res) => {
                setEmUser(res.data);
                console.log(user)
            })
            .catch((err) => console.error(err));
    }, [user?.email]);

    const getLinkClass = ({ isActive }) =>
        isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
            : "text-gray-600 hover:text-blue-500 transition";

    const links = (
        <>
            <li>
                <NavLink className={getLinkClass} to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink className={getLinkClass} to="/fridge">
                    Fridge
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink className={getLinkClass} to="/addfood">
                            Add Food
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={getLinkClass} to="/myitems">
                            My Items
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
                {/* Left Side - Logo */}
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img className="w-12 h-12 rounded-full" src={logo} alt="logo" />
                    </Link>
                    <span className="hidden md:block font-bold text-lg text-gray-700">
                        Food Manager
                    </span>
                </div>

                {/* Center - Nav Links */}
                <div className="hidden lg:flex">
                    <ul className="flex items-center gap-6 text-sm">{links}</ul>
                </div>

                {/* Right Side - User / Auth */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="relative">
                                <img
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    src={user?.photoURL || emUser?.photo || logo}
                                    alt="user"
                                    data-tooltip-id="user-tooltip"
                                    data-tooltip-content={
                                        user?.displayName || emUser?.name || "Guest User"
                                    }
                                />
                                <Tooltip id="user-tooltip" place="bottom" />
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
                            >
                                Log Out <FaArrowRight size={14} />
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <button className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                                    Login
                                </button>
                            </NavLink>
                            <NavLink to="/register">
                                <button className="hidden md:block px-4 py-1.5 text-sm bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition">
                                    Register
                                </button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden bg-white border-t">
                <ul className="flex justify-around py-2 text-sm">{links}</ul>
            </div>
        </nav>
    );
};

export default Navbar;
