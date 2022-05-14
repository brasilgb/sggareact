import React, { Fragment, useState } from 'react'
import { Link, useLocation } from "react-router-dom";


const ALink = ({ url, label, active }) => {
    return (
        <Fragment>
            <Link
                to={url}
                className="flex items-center py-4 px-6 text-gray-500 hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-400"
            >
                {label}
            </Link>
        </Fragment>
    )
};

const ADropDown = ({ children, url, label, position, active }) => {
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

    return (
        <Fragment>
            <Link
                onClick={(e) => toggleSubMenu(e, position)}
                to={url}
                className="flex items-center py-4 px-6 text-gray-500 hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-400"
            >
                {label}
            </Link>
            {menuCategoryOpen[position] &&
                <div
                    onClick={() => setMenuCategoryOpen([false, false])}
                    className={`${active === "" ? "" : ""} w-full transition duration-300 transform bg-gray-50 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
                >
                    {children}
                </div>
            }
        </Fragment>
    )
};

export { ALink, ADropDown };