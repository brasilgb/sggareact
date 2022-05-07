import React, { Fragment, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { IoPersonCircle } from 'react-icons/io5';
import { Link } from "react-router-dom";
import useOnClickOutside from '../ClickOutside';

const MenuProfile = () => {

    const [showOptions, setShowOptions] = useState(false);
    const handleClick = () => {
        setShowOptions(!showOptions);
    };
    const ref = useRef();
    useOnClickOutside(ref, () => setShowOptions(false));

    return (
        <Fragment>
            <div className='relative'>
                <button
                    onClick={handleClick}
                    type="button"
                    className="flex mr-3 text-sm md:mr-0 text-gray-600 transition-colors duration-200 transform md:block hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown"
                >
                    <span className="sr-only">Open user menu</span>
                    <IconContext.Provider value={{ className: "text-3xl font-medium" }}>
                        <div>
                            <IoPersonCircle />
                        </div>
                    </IconContext.Provider>
                </button>
                {showOptions &&
                    <div ref={ref} className="absolute z-50 my-4 -right-12 md:-right-16 text-base list-none bg-white rounded divide-y divide-gray-100 shadow" id="dropdown">
                        <div className="py-3 px-4">
                            <span className="block text-sm text-gray-900">Usuario</span>
                            <span className="block text-sm font-medium text-gray-500 truncate">name@email.com</span>
                        </div>
                        <ul className="py-1" aria-labelledby="dropdown">
                            <li>
                                <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Definições</Link>
                            </li>
                            <li>
                                <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Sair</Link>
                            </li>
                        </ul>
                    </div>
                }
            </div>


        </Fragment>
    );
};

export default MenuProfile;
