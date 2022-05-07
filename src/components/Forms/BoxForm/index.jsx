import React, { Fragment } from 'react';
import { AButtomSave } from '../../Buttons';

export const ABoxFormBody = ({ children }) => {
    return (
        <Fragment>
            <div className="overflow-hidden w-1/2 mx-auto">
                <div className="px-4 py-5">
                    <div className="flex-col items-center">

                        {children}

                    </div>
                </div>
                <div className="py-3 text-right sm:px-6">
                    <AButtomSave />
                </div>
            </div>
        </Fragment>
        );
}
