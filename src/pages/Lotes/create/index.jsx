import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { ABoxAll, ABoxBody, ABoxHeader, ABoxHeaderTitle } from '../../../components/Boxes';
import { ABreadcumb } from '../../../components/Breadcumbs';
import { AButtomBack } from '../../../components/Buttons';
import { AClassName, AInput, AInputSearch } from '../../../components/Forms/Inputs';
import { IconContext } from 'react-icons';
import { IoFileTrayStacked } from "react-icons/io5";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import BoxError from '../../../components/Boxes/BoxError';
import { ABoxFormBody } from '../../../components/Forms/BoxForm';
import { AForm } from '../../../components/Forms';
import api from '../../../services/api';
import { AuthContext } from '../../../contexts/auth';
import moment from 'moment';

import { useForm } from "react-hook-form";
import BoxMessage from '../../../components/Boxes/BoxMessage';
import Lotes from '..';

const Create = ({ loading }) => {

    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { ciclos, lotes, setLotes } = useContext(AuthContext);

    const [value, onChange] = useState(new Date());

    const cl = ciclos.filter((ci) => ci.ativo == 1);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        setMessage('')
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYW5kZXJzb25AZW1haWwuY29tIiwiaWF0IjoxNjUyMDExMjkzfQ.A0eSi-xafALrywZCcQXHYXmSxeN8ncGVIn2pcaz0goo";
        api.post('lotes', {
            "cicloId": cl[0].cicloId,
            "lote": data.lote,
            "data_entrada": moment(value).format('YYYY-MM-DD'),
            "femea": data.femea,
            "macho": data.macho
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setLotes([...lotes, 
                    {
                        "loteId": response.data.lote.loteid,
                        "cicloId": cl[0].cicloId,
                        "lote": data.lote,
                        "aviariosNumber": 0,
                        "data_entrada": moment(value).format('YYYY-MM-DD'),
                        "femea": data.femea,
                        "macho": data.macho
                    }
                ]);
                setErrorMessage('');
                reset();
                setMessage(response.data.message);
                
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
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
                    <form onSubmit={handleSubmit(onSubmit)} >
                        {message && <BoxMessage message={message} />}
                        <ABoxFormBody>

                            <div className="md:flex items-center mt-8">
                                <div className="w-full flex flex-col">
                                    <label className="block font-medium text-gray-600">
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

                            <AInput label="Descrição do lote" id="lote">
                                <input
                                    id="lote"
                                    name="lote"
                                    {...register('lote', {
                                        required: {
                                            value: "Required",
                                            message: 'Digite a descrição do lote!'
                                        }
                                    })}
                                    type="text"
                                    placeholder=""
                                    className={`formatInput ${errors.lote ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                />
                                {errorMessage && <BoxError text={errorMessage} />}
                                {errors.lote && errors.lote?.type === 'required' && <BoxError text={errors.lote.message} />}
                            </AInput>

                            <AInput label="Aves fêmeas" id="femea">
                                <input
                                    id="femea"
                                    name="femea"
                                    {...register('femea', {
                                        required: {
                                            value: "Required",
                                            message: 'Digite o número de fêmeas!'
                                        }
                                    })}
                                    type="text"
                                    placeholder=""
                                    className={`formatInput ${errors.femea ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                />
                                {errors.femea && errors.femea?.type === 'required' && <BoxError text={errors.femea.message} />}
                            </AInput>

                            <AInput label="Aves machos" id="macho">
                                <input
                                    id="macho"
                                    name="macho"
                                    {...register('macho', {
                                        required: {
                                            value: "Required",
                                            message: 'Digite o número de machos!'
                                        }
                                    })}
                                    type="text"
                                    placeholder=""
                                    className={`formatInput ${errors.macho ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                />
                                {errors.macho && errors.macho?.type === 'required' && <BoxError text={errors.macho.message} />}
                            </AInput>

                        </ABoxFormBody>
                    </form>
                </ABoxBody>
            </ABoxAll>
        </Fragment>
    );
};

export default Create;
