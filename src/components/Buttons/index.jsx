import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';

import { IoAdd, IoArrowBack, IoSave } from "react-icons/io5";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { ImSpinner6 } from "react-icons/im";
import { useState } from 'react';

export const AButtomAdd = ({ url }) => {
    const navigate = useNavigate();

    return (
        <Fragment>

            <div className='flex-grow'>
                <button
                    onClick={() => navigate(url)}
                    className='flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
                >
                    <IconContext.Provider value={{ className: "text-lg" }}>
                        <div>
                            <IoAdd />
                        </div>
                    </IconContext.Provider>
                    <span className='ml-1 text-md'>Adicionar</span>
                </button>
            </div>

        </Fragment>
    );
};

export const AButtomBack = ({ url }) => {
    const navigate = useNavigate();

    const [reload, setReload] = useState(false);

    const loadButtom = (() => {
        setReload(true);
        setTimeout(() => {
            navigate(url);
            window.location.reload(true);
        }, 1000)
    });

    return (
        <Fragment>

            <div className='flex-grow'>
                <button
                    onClick={() => loadButtom()}
                    className='flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
                >
                    <IconContext.Provider value={{ className: "text-lg" }}>
                        <div>
                            {reload ?
                                <span><ImSpinner6 className="animate-spin" /></span>
                                :
                                <IoArrowBack />
                            }
                        </div>
                    </IconContext.Provider>
                    <span className='ml-1 text-md'>Voltar</span>
                </button>
            </div>

        </Fragment>
    );
};

export const AButtomSave = () => {
    return (
        <Fragment>
            <button
                type="submit"
                className='inline-flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
            >
                <IconContext.Provider value={{ className: "text-lg" }}>
                    <div>
                        <IoSave />
                    </div>
                </IconContext.Provider>
                <span className='ml-1 text-md'>Salvar</span>
            </button>
        </Fragment>
    );
}

export const AButtomEdit = ({ url }) => {
    const navigate = useNavigate();
    return (
        <Fragment>
            <button
                onClick={() => navigate(url)}
                className='inline-flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm font-normal rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none'
            >
                <IconContext.Provider value={{ className: "text-lg" }}>
                    <div>
                        <FaRegEdit />
                    </div>
                </IconContext.Provider>
                <span className='ml-1 text-md'>Editar</span>
            </button>
        </Fragment>
    );
}

export const AButtomDelete = () => {
    return (
        <Fragment>
            <button
                type="submit"
                className='inline-flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm font-normal rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none'
            >
                <IconContext.Provider value={{ className: "text-lg" }}>
                    <div>
                        <FaRegTrashAlt />
                    </div>
                </IconContext.Provider>
                <span className='ml-1 text-md'>Delete</span>
            </button>
        </Fragment>
    );
}
