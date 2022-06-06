import React, { Fragment } from 'react';

export const ATable = ({ children }) => {
    return (
        <Fragment>
            <table className='w-full'>
                {children}
            </table>
        </Fragment>
    );
};

export const ATr = ({ thead, children }) => {
    return (
        <Fragment>

            {thead ?
                <thead>
                    <tr>
                        {children}
                    </tr>
                </thead>
                :
                <tbody>
                    <tr>
                        {children}
                    </tr>
                </tbody>
            }

        </Fragment>
    );
};

export const ATh = ({ children, colspan }) => {
    return (
        <Fragment>
            <th
            colSpan={colspan}
                className='text-left bg-gray-200 px-2 py-2 text-md'
            >
                    {children}
            </th>
        </Fragment>
    );
};

export const ATd = ({ children, colspan }) => {
    return (
        <Fragment>
            <td
                colSpan={colspan}
                className='p-2 border-b border-gray-100 text-md'
            >
                {children}
            </td>
        </Fragment>
    );
};
