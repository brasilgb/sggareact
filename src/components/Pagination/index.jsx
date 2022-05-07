import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Pagination = () => {
    return (
        <Fragment>
            <div className="flex items-center justify-center">
                <Link to="#" className="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed">
                    previous
                </Link>

                <Link to="#" className="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:flex hover:bg-blue-600 hover:text-white">
                    1
                </Link>

                <Link to="#" className="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:flex hover:bg-blue-600 hover:text-white">
                    2
                </Link>

                <Link to="#" className="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:flex hover:bg-blue-600 hover:text-white">
                    3
                </Link>

                <Link to="#" className="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md hover:bg-blue-600 hover:text-white">
                    Next
                </Link>
            </div>
        </Fragment>
    );
};
