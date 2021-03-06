import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';

import { IoAdd, IoArrowBack, IoSave } from "react-icons/io5";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { ImSpinner6 } from "react-icons/im";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export const AButtomAdd = ({ url }) => {
    const navigate = useNavigate();

    return (
        <Fragment>

            <div className='flex-grow'>
                <button
                    onClick={() => navigate(url)}
                    className='flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
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
    const {setAtualizaDados} = useContext(AuthContext);
    return (
        <Fragment>

            <div className='flex-grow'>
                <button
                    onClick={() => {navigate(url); setAtualizaDados(true);}}
                    className='flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
                >
                    <IconContext.Provider value={{ className: "text-lg" }}>
                        <div>
                            <IoArrowBack />
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
                className='inline-flex items-center justify-center py-1 px-4 border-2 border-white shadow-sm font-normal rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none'
            >
                <IconContext.Provider value={{ className: "text-md" }}>
                    <div>
                        <FaRegEdit />
                    </div>
                </IconContext.Provider>
                <span className='ml-1 text-md'>Editar</span>
            </button>
        </Fragment>
    );
}

export const AButtomDelete = ({ onclick }) => {
    return (
        <Fragment>
            <button
                onClick={onclick}
                className='inline-flex items-center justify-center py-1 px-4 border-2 border-white shadow-sm font-normal rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none'
            >
                <IconContext.Provider value={{ className: "text-md" }}>
                    <div>
                        <FaRegTrashAlt />
                    </div>
                </IconContext.Provider>
                <span className='ml-1 text-md'>Delete</span>
            </button>
        </Fragment>
    );
}
