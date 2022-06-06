import React, { Fragment, useState } from 'react'
import { IconContext } from 'react-icons';
import { Link, useLocation } from "react-router-dom";


const ALink = ({ url, label, active, icon, mleft }) => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");



    return (
        <Fragment>
            <Link
                to={url}
                className={`${splitLocation[1] === active ? "bg-gray-50 bg-opacity-25 text-gray-50" : ""} flex items-center py-3 px-6 text-gray-500 hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-400`}
            >
                <IconContext.Provider value={{className: "text-xl font-bold" }}>
                    <div>
                        {icon}
                    </div>
                </IconContext.Provider>
                <span className="ml-2">{label}</span>
            </Link>
        </Fragment>
    )
};

const ADropDown = ({ children, url, label, position, active, icon }) => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");


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

    const comparalink = active.filter((a) => (a.l === splitLocation[1])).map((i) => (i.l));

    return (
        <Fragment>
            <Link
                onClick={(e) => toggleSubMenu(e, position)}
                to={url}
                className={`${splitLocation[1] === comparalink[0] ? "bg-gray-50 bg-opacity-25 text-gray-50" : ""} flex items-center py-4 px-6 text-gray-500 focus:bg-gray-50 focus:bg-opacity-25 focus:text-gray-50 hover:bg-gray-50 hover:bg-opacity-25 hover:text-gray-400`}
            >
                <IconContext.Provider value={{ className: "text-xl font-bold" }}>
                    <div>
                        {icon}
                    </div>
                </IconContext.Provider>
                <span className="ml-2">{label}</span>
            </Link>
            {menuCategoryOpen[position] &&
                <div
                    onClick={() => setMenuCategoryOpen([false, false])}
                    className={`w-full bg-white transition duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
                >
                    {children}
                </div>
            }
        </Fragment>
    )
};

export { ALink, ADropDown };