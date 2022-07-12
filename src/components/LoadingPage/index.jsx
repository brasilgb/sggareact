import React from 'react'
import { IconContext } from 'react-icons';
import { FaSpinner } from 'react-icons/fa';

const LoadingPage = () => {
    return (
        <div className="h-full flex flex-grow items-center justify-center">
            <IconContext.Provider value={{ className: "text-4xl text-gray-300 animate-spin" }}>
                <div>
                    <FaSpinner />
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default LoadingPage