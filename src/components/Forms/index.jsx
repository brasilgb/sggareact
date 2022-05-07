import React, { Fragment } from 'react';

export const AForm = ({ children, action }) => {

    return (
        <Fragment>
            <form
                action={action}
                method="POST"
            >
                {children}
            </form>
        </Fragment>

    );

};