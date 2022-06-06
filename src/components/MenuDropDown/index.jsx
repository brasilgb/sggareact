import React, { Fragment, useRef, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

import navData from '../MenuDropDown/navData';

const MenuDropDown = () => {

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    console.log(splitLocation[1]);

    const [menuCategoryOpen, setMenuCategoryOpen] = useState([false, false]);

    const toggleSubMenu = (e, i) => {
        e.preventDefault()

        const clone = menuCategoryOpen.slice(0)

        const newState = clone.map((val, index) => {
            if (index === i) {

                return val
            }
            return false
        })
        newState[i] = !newState[i]
        setMenuCategoryOpen(newState)

    };

    const menu = navData.map((nav) => nav);

    // console.log(menu);
    return (
        <Fragment>
            <ul className="mt-4 m-2 md:flex-row md:mt-0 md:text-sm md:font-medium">
                {menu.map((men, m) => (
                    !men.submenu ? (

                        <li key={m}>
                            <Link to={men.url}
                                className={`${splitLocation[1] === men.url.split("/") ? "bg-gray-500":"bg-gray-50"} flex items-center rounded-md py-4 px-6 text-gray-50 hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-100`} aria-current="page">
                                {men.menu}
                            </Link>
                        </li>

                    ) : (

                        <li key={m}>
                            <div className="block">
                                <Link to="#"
                                    onClick={(e) => toggleSubMenu(e, m)}
                                    className={`${splitLocation[1] === men.url.split("/") ? "bg-gray-500":"bg-gray-50"} flex items-center ${menuCategoryOpen[m] ? "focus:bg-gray-900 rounded-t-md" : "rounded-md"}  py-4 px-6 text-gray-50 hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-100`}
                                >
                                    {men.menu}
                                </Link>
                                {menuCategoryOpen[m] &&
                                    <div
                                        onClick={() => setMenuCategoryOpen([false, false])}
                                        className={`${splitLocation[1] === men.url.split("/") ? "bg-gray-500":"bg-gray-50"} w-full transition duration-300 transform bg-gray-50 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
                                    >
                                        {men.submenu.map((sub, s) => (
                                            <Link key={s}
                                                to={sub.url}
                                                className="flex items-center py-4 px-6 text-gray-500 hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-400 "
                                            >
                                                {sub.menu}
                                            </Link>
                                        ))}
                                    </div>
                                }
                            </div>
                        </li>

                    )

                ))}


            </ul>
        </Fragment>
    );
};

export default MenuDropDown;
