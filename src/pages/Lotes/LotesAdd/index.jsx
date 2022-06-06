import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { ABoxAll, ABoxBody, ABoxHeader, ABoxHeaderTitle } from '../../../components/Boxes';
import { ABreadcumb } from '../../../components/Breadcumbs';
import { AButtomBack } from '../../../components/Buttons';
import { AInput, AInputSearch } from '../../../components/Forms/Inputs';
import { IconContext } from 'react-icons';
import { IoFileTrayStacked } from "react-icons/io5";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

import { ABoxFormBody } from '../../../components/Forms/BoxForm';
import { AForm } from '../../../components/Forms';
import api from '../../../services/api';
import { AuthContext } from '../../../contexts/auth';
import moment from 'moment';

const LotesAdd = ({ loading }) => {

    const { ciclos } = useContext(AuthContext);

    const [value, onChange] = useState(new Date());
    const dateRef = useRef();
    const loteRef = useRef();
    const femeaRef = useRef();
    const machoRef = useRef();

    const cl = ciclos.filter((ci) => ci.ativo == 1);
;

    function handleSubmit(e) {
        e.preventDefault();
        // alert();
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYW5kZXJzb25AZW1haWwuY29tIiwiaWF0IjoxNjUyMDExMjkzfQ.A0eSi-xafALrywZCcQXHYXmSxeN8ncGVIn2pcaz0goo";
        api.post('lotes', {
            "cicloId": cl[0].cicloId,
            "lote": loteRef.current.value,
            "data_entrada": moment(value).format('YYYY-MM-DD'),
            "femea": femeaRef.current.value,
            "macho": machoRef.current.value
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }

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
                            { label: "Lotes", url: "/lotes", linked: true },
                            { label: "Adicionar Lotes", url: "/lotesadd", linked: false }
                        ]
                    } />
                </ABoxHeader>

                <ABoxHeader>
                    <AButtomBack url="/lotes" />
                    <AInputSearch place="Buscar por lote" />
                </ABoxHeader>

                <ABoxBody>
                    <AForm onSubmit={handleSubmit} >

                        <ABoxFormBody>

                            <div className="md:flex items-center mt-8">
                                <div className="w-full flex flex-col">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        Data de cadastro
                                    </label>
                                    <DateTimePicker
                                        onChange={onChange}
                                        value={value}
                                        disableClock={true}
                                        format="dd/MM/yyyy"
                                        className="mt-1 w-full font-semibold text-gray-600"
                                        autoFocus={false}
                                        locale="pt-BR"
                                        clearIcon=""
                                        calendarClassName="px-4"
                                    />
                                </div>
                            </div>

                            <AInput
                                id="lote"
                                type="text"
                                valref={loteRef}
                                place=""
                                label="Descrição do lote"
                            />

                            <AInput
                                id="lote"
                                type="text"
                                valref={femeaRef}
                                place=""
                                label="Aves fêmeas"
                            />

                            <AInput
                                id="lote"
                                type="text"
                                valref={machoRef}
                                place=""
                                label="Aves machos"
                            />

                        </ABoxFormBody>
                    </AForm>
                </ABoxBody>
            </ABoxAll>
        </Fragment>
    );
};

export default LotesAdd;
