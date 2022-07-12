import { Fragment } from "react"

export const ABoxAll = ({ children }) => {

    return (
        <Fragment>
            <div className="m-4 bg-gray-100 border-2 border-white rounded shadow">
                {children}
            </div>
        </Fragment>
    );

}

export const ABoxHeader = ({ children }) => {

    return (
        <Fragment>
            <div className="flex items-center justify-between border-b border-gray-200 p-2">
                {children}
            </div>
        </Fragment>
    );

}

export const ABoxHeaderTitle = ({ children }) => {

    return (
        <Fragment>
            <div className="flex items-center justify-center">
                {children}
            </div>
        </Fragment>
    );

}

export const ABoxBody = ({ children }, animacao) => {

    return (
        <Fragment>
            <div className={`bg-gray-50 p-4 overflow-x-auto ${animacao}`}>
                {children}
            </div>
        </Fragment>
    );

}

export const ABoxFooter = ({ children }) => {

    return (
        <Fragment>
            <div className="bg-gray-100 p-2">
                {children}
            </div>
        </Fragment>
    );

}
