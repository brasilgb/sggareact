import React, { Fragment, useContext, useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader, ABoxHeaderTitle } from '../../components/Boxes';
import { ABreadcumb } from '../../components/Breadcumbs';
import { AButtomAdd, AButtomDelete, AButtomEdit } from '../../components/Buttons';
import { AInputSearch } from '../../components/Forms/Inputs';
import { IconContext } from 'react-icons';
import { IoFileTrayStacked } from "react-icons/io5";
import { ATable, ATd, ATh, ATr } from '../../components/Tables';
import ReactPaginate from 'react-paginate';
import { AuthContext } from '../../contexts/auth';
import moment from 'moment';
import api from '../../services/api';
import ReactLoading from 'react-loading';

const Aviarios = () => {

    const { aviarios, setAviarios } = useContext(AuthContext);
    const [loading, setLoading] = useState(undefined);
    const [aviario, setAviario] = useState(aviarios.slice(0, 5000));
console.log(aviarios);
    useEffect(() => {
        setTimeout(() => {
            setAviario(aviarios.slice(0, 1000));
            setLoading(true);
        }, 1200)
    }, [aviarios])

    const [pageNumber, setPageNumber] = useState(0);

    const aviarioPerPage = 10;
    const pagesVisited = pageNumber * aviarioPerPage;
    const displayAviarios = aviario
        .slice(pagesVisited, pagesVisited + aviarioPerPage)
        .map((lt, index) => {
            return (
                <ATr key={index} thead={false} colorRow={(index % 2)}>
                    <ATd>{lt.aviario}</ATd>
                    <ATd>{lt.totl_femea}</ATd>
                    <ATd>{lt.totl_macho}</ATd>
                    <ATd>{moment(lt.data_entrada, true).locale('pt-br').format('DD/MM/YYYY')}</ATd>
                    <ATd>
                        <AButtomEdit url={`/aviarios/${lt.aviarioId}`} />
                        <AButtomDelete onclick={(e) => deleteRow(lt.aviarioId, e)} />
                    </ATd>
                </ATr>
            );
        });

    const pageCount = Math.ceil(aviario.length / aviarioPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    async function deleteAviario(id) {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYW5kZXJzb25AZW1haWwuY29tIiwiaWF0IjoxNjQ2MDY5MzQwfQ.w3ZU9hoOq5AlXwqc6c9tfjtSoLh_evYysovzVVekQZ0";
        await api.delete('aviarios', {
            data: { aviarioId: id },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const lot = aviarios.filter(item => item.aviarioId !== id);
                // console.log(lot);
                setAviario(lot);
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
                        <p className="my-6">Você deseja excluir este aviario?</p>
                        <button
                            className="w-36 px-4 py-2 mr-2 bg-gray-700 rounded shadow text-white"
                            onClick={onClose}>Não</button>
                        <button
                            className="w-36 px-4 py-2 ml-2 bg-red-700 rounded shadow text-white"
                            onClick={() => {
                                deleteAviario(id);
                                onClose();
                            }}
                        >
                            Sim
                        </button>
                    </div>
                );
            }
        });
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
                        <h1 className='ml-1 text-lg font-medium'>Aviarios</h1>
                    </ABoxHeaderTitle>
                    <ABreadcumb links={
                        [
                            { label: "Aviarios", url: "/aviarios", linked: false }
                        ]
                    } />
                </ABoxHeader>

                <ABoxHeader>
                    <AButtomAdd url="/aviarios/create" />
                    <AInputSearch place="Buscar por aviario" />
                </ABoxHeader>

                <ABoxBody>

                    <ATable>
                        <ATr thead={true}>
                            <ATh width="w-28">Aviario</ATh>
                            <ATh>Fêmeas</ATh>
                            <ATh>Machos</ATh>
                            <ATh>Cadastro</ATh>
                            <ATh width="w-56"></ATh>
                        </ATr>
                        {!loading ?
                            <ATr>
                                <ATd>
                                    <div className="absolute top-0 left-0 right-0 flex items-center justify-center w-full h-screen bg-indigo-600 bg-opacity-20">
                                        <ReactLoading className="mx-auto" type="bars" color="#0D2237" height={50} width={50} />
                                    </div>
                                </ATd>
                            </ATr>
                            :
                            displayAviarios
                        }
                    </ATable>

                </ABoxBody>
                {aviario.length > aviarioPerPage &&
                    <ABoxFooter>
                        <ReactPaginate
                            previousLabel={"Anterior"}
                            nextLabel={"Próximo"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName="flex px-4 items-center justify-center paginationButtns"
                            pageLinkClassName="flex items-center px-4 py-2 transform rounded-md"
                            previousLinkClassName="flex items-center mr-2 transform rounded-md"
                            nextLinkClassName="flex items-center ml-2 transform rounded-md"
                            disabledClassName="flex items-centertext-gray-300 cursor-not-allowed"
                            activeClassName="flex items-center text-gray-50 transform bg-blue-500 rounded-md shadow-md border border-white hover:shadow-md"
                        />
                    </ABoxFooter>
                }
            </ABoxAll>

        </Fragment>
    );
};

export default Aviarios;
