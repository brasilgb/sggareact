import React, { Fragment, useRef, useState } from 'react';
import useOnClickOutside from '../ClickOutside';
import MenuProfile from '../MenuProfile';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoMenu, IoNotifications } from 'react-icons/io5';
import MenuDropDown from '../MenuDropDown';

const NavBar = () => {

    const openMenu = () => {
        setShowMenu(!showMenu);
    };

    const ref = useRef();
    const [showMenu, setShowMenu] = useState(false);
    useOnClickOutside(ref, () => setShowMenu(false));

    return (
        <Fragment>
            <nav className="shadow bg-gray-100">
                <div className="container px-6 py-4 mx-auto">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-semibold text-gray-700">
                                <Link
                                    to="/"
                                    className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform lg:text-3xl hover:text-gray-700">
                                    Brand
                                </Link>
                            </div>

                            {/* <!-- Mobile menu button --> */}
                            <div className="flex md:hidden">
                                <button
                                    type="button"
                                    onClick={(e) => openMenu()}
                                    className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
                                    <IconContext.Provider value={{ classNameName: "text-lg font-medium" }}>
                                        <div>
                                            <IoMenu />
                                        </div>
                                    </IconContext.Provider>
                                </button>
                            </div>
                        </div>

                        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
                        <div className={`flex-1 md:flex md:items-center md:justify-between ${showMenu ? "block" : "hidden"}`}>
                            <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
                                <MenuDropDown />
                            </div>

                            <div className="flex items-center mt-4 md:mt-0">
                                <button className="hidden mx-4 text-gray-600 transition-colors duration-200 transform md:block hover:text-gray-700 focus:text-gray-700 focus:outline-none">
                                    <IconContext.Provider value={{ className: "text-2xl font-medium" }}>
                                        <div>
                                            <IoNotifications />
                                        </div>
                                    </IconContext.Provider>
                                </button>
                                <MenuProfile />
                                {/* <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                    <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                                    </div>

                                    <h3 className="mx-2 text-sm font-medium text-gray-700 md:hidden">Khatab wedaa</h3>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
};

export default NavBar;
