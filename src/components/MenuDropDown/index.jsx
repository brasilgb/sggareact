import React, { Fragment, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import useOnClickOutside from '../ClickOutside';

import navData from '../MenuDropDown/navData';

const MenuDropDown = () => {

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
    const ref = useRef();
    useOnClickOutside(ref, () => setMenuCategoryOpen([false, false]));

    const menu = navData.map((nav) => nav);

    // console.log(menu);
    return (
        <Fragment>
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                {menu.map((men, m) => (
                    !men.submenu ? (

                        <li key={m}>
                            <Link to={men.url}
                                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">
                                {men.menu}
                            </Link>
                        </li>

                    ) : (

                        <li key={m}>
                            <div className="relative inline-block">
                                <Link to="#"
                                    onClick={(e) => toggleSubMenu(e, m)}
                                    className="relative z-10 block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                                >
                                    {men.menu}
                                </Link>
                                {menuCategoryOpen[m] &&
                                    <div
                                        onMouseLeave={() => setMenuCategoryOpen([false, false])}
                                        // ref={ref}
                                        className={"absolute -left-10 z-20 w-48 py-2 mt-4 bg-white rounded-md shadow-xl"}
                                    >
                                        {men.submenu.map((sub, s) => (
                                            <Link key={s}
                                                to={sub.url}
                                                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100"
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
