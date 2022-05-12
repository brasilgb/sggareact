import React, { Fragment, useRef, useState } from 'react';
import useOnClickOutside from '../ClickOutside';
import MenuProfile from '../MenuProfile';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoMenu, IoNotificationsOutline, IoPersonAddOutline, IoPersonCircleOutline } from 'react-icons/io5';
import MenuDropDown from '../MenuDropDown';

const Header = () => {

    const openMenu = () => {
        setShowMenu(!showMenu);
    };

    const ref = useRef();
    const [showMenu, setShowMenu] = useState(false);
    useOnClickOutside(ref, () => setShowMenu(false));

    return (
        <Fragment>
            <header className="flex justify-between items-center py-4 px-6 bg-gray200 border-b border-white shadow">
                <div className="flex items-center"></div>

                <div className="flex items-center">
                    <div x-data="{ notificationOpen: false }" className="relative">
                        <button
                            className="flex mx-4 text-gray-600 focus:outline-none">
                            <IconContext.Provider value={{ className: "text-2xl font-bold" }}>
                                <div>
                                    <IoNotificationsOutline />
                                </div>
                            </IconContext.Provider>
                        </button>

                        <div x-show="notificationOpen"
                            className="fixed inset-0 h-full w-full z-10" style={{ display: "none" }}></div>

                        <div x-show="notificationOpen"
                            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10"
                            style={{ width: "20rem", display: "none" }}>
                            <a href="#"
                                className="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-indigo-600 -mx-2">
                                <img className="h-8 w-8 rounded-full object-cover mx-1"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
                                    alt="avatar" />
                                <p className="text-sm mx-2">
                                    <span className="font-bold" href="#">Sara Salah</span> replied on the <span
                                        className="font-bold text-indigo-400" href="#">Upload Image</span> artical . 2m
                                </p>
                            </a>
                        </div>
                    </div>

                    <div x-data="{ dropdownOpen: false }" className="relative">
                        <button
                            className="relative block focus:outline-none">
                            <IconContext.Provider value={{ className: "text-3xl font-bold text-gray-500" }}>
                                <div>
                                    <IoPersonCircleOutline />
                                </div>
                            </IconContext.Provider>
                        </button>

                        <div className="fixed inset-0 h-full w-full z-10"
                            style={{ display: "none" }}></div>

                        <div x-show="dropdownOpen"
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
                            style={{ display: "none" }}>
                            <a href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                            <a href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
                            <a href="/login"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Logout</a>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    );
};

export default Header;
