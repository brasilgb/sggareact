import React, { Fragment, useContext, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
import api from '../../services/api';

const Lotes = () => {

    const { lotes, setLotes } = useContext(AuthContext);
    const [post, setPost] = useState();

    async function deleteLote(id) {
        
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYW5kZXJzb25AZW1haWwuY29tIiwiaWF0IjoxNjQ2MDY5MzQwfQ.w3ZU9hoOq5AlXwqc6c9tfjtSoLh_evYysovzVVekQZ0";

        await api.delete('lotes', {
            data: { loteId: id },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const lot = lotes.filter(item => item.loteId !== id);
                console.log(lot);
                setLotes(lot);
            }).catch(err => {
                console.log(err);
            })
    }


    const deleteRow = ((id, e) => {
        e.preventDefault();
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="w-96 h-52 p-8 shadow text-center bg-gray-100 rounded ">
                        <h1 className="text-xl">Têm certeza?</h1>
                        <p className="my-6">Você deseja excluir este lote?</p>
                        <button
                            className="w-36 px-4 py-2 mr-2 bg-gray-700 rounded shadow text-white"
                            onClick={onClose}>Não</button>
                        <button
                            className="w-36 px-4 py-2 ml-2 bg-red-700 rounded shadow text-white"
                            onClick={() => {
                                deleteLote(id);
                                onClose();
                            }}
                        >
                            Sim
                        </button>
                    </div>
                );
            }
        });

        //     confirmAlert({
        //         title: 'Confirm to submit',
        //         message: 'Are you sure to do this.',
        //         buttons: [
        //             {
        //                 label: 'Yes',
        //                 onClick: () => alert('deletado')
        //             },
        //             {
        //                 label: 'No',
        //                 //onClick: () => alert('Click No')
        //             }
        //         ]
        //     });
    })

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

                                    <AButtomDelete onclick={(e) => deleteRow(lote.loteId, e)} />

                                </ATd>
                            </ATr>
                        ))}


                    </ATable>

                </ABoxBody>
                <ABoxFooter>
                    <Pagination />
                </ABoxFooter>
                <div className="w-96 h-52 p-8 shadow-lg text-center bg-gray-50 rounded ">
                    <h1 className="text-xl">Têm certeza?</h1>
                    <p className="my-6">Você deseja excluir este lote?</p>
                    <button
                        className="w-36 px-4 py-2 mr-2 bg-gray-700 rounded shadow text-white"
                        onClick={'onClose'}>Não</button>
                    <button
                        className="w-36 px-4 py-2 ml-2 bg-red-700 rounded shadow text-white"
                        onClick={() => {
                            alert('Feito');
                            //   onClose();
                        }}
                    >
                        Sim
                    </button>
                </div>
            </ABoxAll>
        </Fragment>
    );
};

export default Lotes;
