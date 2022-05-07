import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoAdd, IoArrowBack, IoSave } from "react-icons/io5";

export const AButtomAdd = ({ url }) => {
    const navigate = useNavigate();
    return (
        <Fragment>

            <div className='flex-grow'>
                <button
                    onClick={() => navigate(url)}
                    className='flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
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
    return (
        <Fragment>

            <div className='flex-grow'>
                <button
                    onClick={() => navigate(url)}
                    className='flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
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
                className='inline-flex items-center justify-center py-2 px-4 border-2 border-white shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
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