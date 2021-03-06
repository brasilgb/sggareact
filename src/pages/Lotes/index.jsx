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
import LoadingPage from '../../components/LoadingPage';
import 'animate.css';

const Lotes = () => {

    const { setLoading, loading } = useContext(AuthContext);
    const [lotes, setLotes] = useState([]);


    // Data Lotes
    useEffect(() => {
        setLoading(true);
        async function getLotes() {
            await api.get('lotes')
                .then((lotes) => {
                    const lsort = lotes.data.lotes.sort((a, b) => a.loteId < b.loteId ? 1 : -1);
                    setLotes(lsort);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getLotes();
    }, [setLoading]);

    const [lote, setLote] = useState(lotes.slice(0, 5000));

    useEffect(() => {
        setLote(lotes.slice(0, 1000));
    }, [lotes])

    const [pageNumber, setPageNumber] = useState(0);

    const lotePerPage = 10;
    const pagesVisited = pageNumber * lotePerPage;
    const displayLotes = lote
        .slice(pagesVisited, pagesVisited + lotePerPage)
        .map((lt, index) => {
            return (
                <ATr key={index} thead={false} colorRow={(index % 2)}>
                    <ATd>{lt.lote}</ATd>
                    <ATd>{lt.femea}</ATd>
                    <ATd>{lt.capi_femea}</ATd>
                    <ATd>{lt.macho}</ATd>
                    <ATd>{lt.capi_macho}</ATd>
                    <ATd>{lt.femea + lt.macho}</ATd>
                    <ATd>{lt.aviariosNumber}</ATd>
                    <ATd>{moment(lt.data_entrada).format('DD/MM/YYYY')}</ATd>
                    <ATd>
                        <AButtomEdit url={`/lotes/${lt.loteId}`} />
                        <AButtomDelete onclick={(e) => deleteRow(lt.loteId, e)} />
                    </ATd>
                </ATr>
            );
        });

    const pageCount = Math.ceil(lote.length / lotePerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

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
                const lot = lote.filter(item => item.loteId !== id);
                setLote(lot);
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
                        <h1 className="text-xl">T??m certeza?</h1>
                        <p className="my-6">Voc?? deseja excluir este lote?</p>
                        <button
                            className="w-36 px-4 py-2 mr-2 bg-gray-700 rounded shadow text-white"
                            onClick={onClose}>N??o</button>
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

                <ABoxBody animacao="animate__animated animate__fadeIn">

                    {loading ?
                        <LoadingPage />
                        :
                        <ATable>
                            <ATr thead={true}>
                                <ATh width="w-28">Lote</ATh>
                                <ATh>F??meas</ATh>
                                <ATh>Capitalizadas/Data</ATh>
                                <ATh>Machos</ATh>
                                <ATh>Capitalizadas/Data</ATh>
                                <ATh>Total Aves</ATh>
                                <ATh>Avi??rios</ATh>
                                <ATh>Cadastro</ATh>
                                <ATh width="w-56"></ATh>
                            </ATr>
                            {displayLotes}
                        </ATable>
                    }

                </ABoxBody>

                {lote.length > lotePerPage &&
                    <ABoxFooter>
                        <ReactPaginate
                            previousLabel={"Anterior"}
                            nextLabel={"Pr??ximo"}
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

export default Lotes;
