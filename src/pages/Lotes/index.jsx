import React, { Fragment, useContext } from 'react';
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader, ABoxHeaderTitle } from '../../components/Boxes';
import { ABreadcumb } from '../../components/Breadcumbs';
import { AButtomAdd, AButtomDelete, AButtomEdit } from '../../components/Buttons';
import { AInputSearch } from '../../components/Forms/Inputs';
import { IconContext } from 'react-icons';
import { IoFileTrayStacked } from "react-icons/io5";
import { ATable, ATd, ATh, ATr } from '../../components/Tables';
import { Pagination } from '../../components/Pagination';
import { AuthContext } from '../../contexts/auth';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';

const Lotes = () => {

    const { lotes } = useContext(AuthContext);

    return (
        <Fragment>
            <ABoxAll>
                <ABoxHeader>
                    <ABoxHeaderTitle>
                        <IconContext.Provider value={{ className: "text-xl font-medium" }}>
                            <div>
                                <IoFileTrayStacked />
                            </div>
                        </IconContext.Provider>
                        <h1 className='ml-1 text-lg font-medium'>Lotes</h1>
                    </ABoxHeaderTitle>
                    <ABreadcumb links={
                        [
                            { label: "Lotes", url: "/lotes", linked: false }
                        ]
                    } />
                </ABoxHeader>

                <ABoxHeader>
                    <AButtomAdd url="/lotes/create" />
                    <AInputSearch place="Buscar por lote" />
                </ABoxHeader>

                <ABoxBody>

                    <ATable>
                        <ATr thead={true}>
                            <ATh>Lote</ATh>
                            <ATh>Fêmeas</ATh>
                            <ATh>Capitalizadas/Data</ATh>
                            <ATh>Machos</ATh>
                            <ATh>Capitalizadas/Data</ATh>
                            <ATh>Total Aves</ATh>
                            <ATh>Aviários</ATh>
                            <ATh>Cadastro</ATh>
                            <ATh></ATh>
                        </ATr>
                        {lotes.map((lote, index) => (
                            <ATr key={index} thead={false}>
                                <ATd>{lote.lote}</ATd>
                                <ATd>{lote.femea}</ATd>
                                <ATd>{lote.capi_femea}</ATd>
                                <ATd>{lote.macho}</ATd>
                                <ATd>{lote.capi_macho}</ATd>
                                <ATd>{lote.femea + lote.macho}</ATd>
                                <ATd>{lote.aviariosNumber}</ATd>
                                <ATd>{moment(lote.data_entrada).format('DD/MM/YYYY')}</ATd>
                                <ATd>
                                    <AButtomEdit url={`/lotes/${lote.loteId}`} />
                                    <AButtomDelete url={`/lotes/${lote.loteId}`} />
                                </ATd>
                            </ATr>
                        ))}


                    </ATable>

                </ABoxBody>
                <ABoxFooter>
                    <Pagination />
                </ABoxFooter>
            </ABoxAll>
        </Fragment>
    );
};

export default Lotes;
