import React, { Fragment } from 'react';

export const AForm = ({ children, onSubmit }) => {

    return (
        <Fragment>
            <form
                onSubmit={onSubmit}
                method="POST"
            >
                {children}
            </form>
        </Fragment>

    );

};