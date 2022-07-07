import React, { Fragment, useContext, useState } from 'react';
import { ABoxAll, ABoxBody, ABoxHeader, ABoxHeaderTitle } from '../../../components/Boxes';
import { ABreadcumb } from '../../../components/Breadcumbs';
import { AButtomBack } from '../../../components/Buttons';
import { AInput, AInputSearch } from '../../../components/Forms/Inputs';
import { IconContext } from 'react-icons';
import { IoFileTrayStacked } from "react-icons/io5";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import BoxError from '../../../components/Boxes/BoxError';
import { ABoxFormBody } from '../../../components/Forms/BoxForm';
import api from '../../../services/api';
import { AuthContext } from '../../../contexts/auth';
import moment from 'moment';
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Create = ({ loading }) => {

    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { ciclos, lotes, aviarios, setAviarios } = useContext(AuthContext);

    const [value, onChange] = useState(new Date());

    const cl = ciclos.filter((ci) => ci.ativo == 1);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        setMessage('')
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYW5kZXJzb25AZW1haWwuY29tIiwiaWF0IjoxNjUyMDExMjkzfQ.A0eSi-xafALrywZCcQXHYXmSxeN8ncGVIn2pcaz0goo";
        api.post('aviarios', {
            "cicloId": cl[0].cicloId,
            "loteId": data.loteId,
            "aviario": data.aviario,
            "data_entrada": moment(value).format('YYYY-MM-DD'),
            "box1_femea": data.box1_femea,
            "box2_femea": data.box2_femea,
            "box3_femea": data.box3_femea,
            "box4_femea": data.box4_femea,
            "box1_macho": data.box1_macho,
            "box2_macho": data.box2_macho,
            "box3_macho": data.box3_macho,
            "box4_macho": data.box4_macho,
            "totl_femea": parseInt(data.box1_femea) + parseInt(data.box2_femea) + parseInt(data.box3_femea) + parseInt(data.box4_femea),
            "totl_macho": parseInt(data.box1_macho) + parseInt(data.box2_macho) + parseInt(data.box3_macho) + parseInt(data.box4_macho)
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setAviarios([...aviarios,
                {
                    "cicloId": cl[0].cicloId,
                    "loteId": data.loteId,
                    "aviario": data.aviario,
                    "data_entrada": moment(value).format('YYYY-MM-DD'),
                    "femea": data.femea,
                    "macho": data.macho
                }
                    /**
                     *         cicloId,
            loteId,
            aviario,
            data_entrada,
            box1_femea,
            box2_femea,
            box3_femea,
            box4_femea,
            box1_macho,
            box2_macho,
            box3_macho,
            box4_macho,
            totl_femea,
            totl_macho
                     */
                ]);
                setErrorMessage('');
                reset();
                toast.success(response.data.message, {
                    transition: Slide
                })

            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
            })
    }

    return (
        <Fragment>
            <ToastContainer position="top-right" autoClose={5000} />
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
                            { label: "Aviarios", url: "/aviarios", linked: true },
                            { label: "Adicionar Aviarios", url: "/aviariosadd", linked: false }
                        ]
                    } />
                </ABoxHeader>

                <ABoxHeader>
                    <AButtomBack url="/aviarios" />
                    <AInputSearch place="Buscar por lote" />
                </ABoxHeader>

                <ABoxBody>
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <ABoxFormBody>

                            <div className="lg:flex items-center mt-8">
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

                            <AInput label="Descrição do lote" id="loteId">
                                <select
                                    id="loteId"
                                    name="loteId"
                                    {...register('loteId', {
                                        required: {
                                            value: "Required",
                                            message: 'Digite a descrição do lote!'
                                        }
                                    })}
                                    type="text"
                                    placeholder=""
                                    className={`formatInput ${errors.loteId ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                >
                                    <option value="0">Selecione o Lote</option>
                                    {lotes.map((lote, index) => (
                                        <option key={index} value={lote.loteId}>{lote.lote}</option>
                                    ))}

                                </select>
                                {errorMessage && <BoxError text={errorMessage} />}
                                {errors.lote && errors.lote?.type === 'required' && <BoxError text={errors.lote.message} />}
                            </AInput>
                            <AInput label="Descrição do aviário" id="aviario">
                                <input
                                    id="aviario"
                                    name="aviario"
                                    {...register('aviario', {
                                        required: {
                                            value: "Required",
                                            message: 'Digite a descrição do aviário!'
                                        }
                                    })}
                                    type="text"
                                    placeholder=""
                                    className={`formatInput ${errors.aviario ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                />
                                {errors.aviario && errors.aviario?.type === 'required' && <BoxError text={errors.aviario.message} />}
                            </AInput>
                            {/* Insere box número 1 */}
                            <div className=" mt-4  border border-gray-300 rounded">
                                <div className="bg-gray-200 p-2 border-b border-gray-300">
                                    <h1 className="text-base text-gray-600 font-semibold uppercase">Box 1</h1>
                                </div>
                                <div className="lg:flex flex-row gap-4 p-2">
                                    <div className="lg:flex-1">
                                        <AInput label="Aves fêmeas" id="box1_femea">
                                            <input
                                                id="box1_femea"
                                                name="box1_femea"
                                                {...register('box1_femea', {
                                                    required: {
                                                        value: "Required",
                                                        message: 'Digite o número de fêmeas!'
                                                    }
                                                })}
                                                type="text"
                                                placeholder=""
                                                className={`formatInput ${errors.box1_femea ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                            />
                                            {errors.box1_femea && errors.box1_femea?.type === 'required' && <BoxError text={errors.box1_femea.message} />}
                                        </AInput>
                                    </div>

                                    <div className="lg:flex-1">
                                        <AInput label="Aves machos" id="box1_macho">
                                            <input
                                                id="box1_macho"
                                                name="box1_macho"
                                                {...register('box1_macho', {
                                                    required: {
                                                        value: "Required",
                                                        message: 'Digite o número de machos!'
                                                    }
                                                })}
                                                type="text"
                                                placeholder=""
                                                className={`formatInput ${errors.box1_macho ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                            />
                                            {errors.box1_macho && errors.box1_macho?.type === 'required' && <BoxError text={errors.box1_macho.message} />}
                                        </AInput>
                                    </div>

                                </div>
                            </div>

                            {/* Insere box número 2 */}
                            <div className=" mt-4  border border-gray-300 rounded">
                                <div className="bg-gray-200 border-b border-gray-300 p-2">
                                    <h1 className="text-base text-gray-600 font-semibold uppercase">Box 2</h1>
                                </div>
                                <div className="lg:flex flex-row gap-4 p-2">
                                    <div className="lg:flex-1">
                                        <AInput label="Aves fêmeas" id="box2_femea">
                                            <input
                                                id="box2_femea"
                                                name="box2_femea"
                                                {...register('box2_femea', {
                                                    required: {
                                                        value: "Required",
                                                        message: 'Digite o número de fêmeas!'
                                                    }
                                                })}
                                                type="text"
                                                placeholder=""
                                                className={`formatInput ${errors.box2_femea ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                            />
                                            {errors.box2_femea && errors.box2_femea?.type === 'required' && <BoxError text={errors.box2_femea.message} />}
                                        </AInput>
                                    </div>

                                    <div className="lg:flex-1">
                                        <AInput label="Aves machos" id="box2_macho">
                                            <input
                                                id="box2_macho"
                                                name="box2_macho"
                                                {...register('box2_macho', {
                                                    required: {
                                                        value: "Required",
                                                        message: 'Digite o número de machos!'
                                                    }
                                                })}
                                                type="text"
                                                placeholder=""
                                                className={`formatInput ${errors.box2_macho ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                            />
                                            {errors.box2_macho && errors.box2_macho?.type === 'required' && <BoxError text={errors.box2_macho.message} />}
                                        </AInput>
                                    </div>

                                </div>
                            </div>

                            {/* Insere box número 3 */}
                            <div className=" mt-4  border border-gray-300 rounded">
                                <div className="bg-gray-200 border-b border-gray-300 p-2">
                                    <h1 className="text-base text-gray-600 font-semibold uppercase">Box 3</h1>
                                </div>
                                <div className="lg:flex flex-row gap-4 p-2">
                                    <div className="lg:flex-1">
                                        <AInput label="Aves fêmeas" id="box3_femea">
                                            <input
                                                id="box3_femea"
                                                name="box3_femea"
                                                {...register('box3_femea', {
                                                    required: {
                                                        value: "Required",
                                                        message: 'Digite o número de fêmeas!'
                                                    }
                                                })}
                                                type="text"
                                                placeholder=""
                                                className={`formatInput ${errors.box3_femea ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                            />
                                            {errors.box3_femea && errors.box3_femea?.type === 'required' && <BoxError text={errors.box3_femea.message} />}
                                        </AInput>
                                    </div>

                                    <div className="lg:flex-1">
                                        <AInput label="Aves machos" id="box3_macho">
                                            <input
                                                id="box3_macho"
                                                name="box3_macho"
                                                {...register('box3_macho', {
                                                    required: {
                                                        value: "Required",
                                                        message: 'Digite o número de machos!'
                                                    }
                                                })}
                                                type="text"
                                                placeholder=""
                                                className={`formatInput ${errors.box3_macho ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                            />
                                            {errors.box3_macho && errors.box3_macho?.type === 'required' && <BoxError text={errors.box3_macho.message} />}
                                        </AInput>
                                    </div>

                                </div>
                            </div>

                            {/* Insere box número 4 */}
                            <div className=" mt-4  border border-gray-300 rounded">
                                <div className="bg-gray-200 border-b border-gray-300 p-2">
                                    <h1 className="text-base text-gray-600 font-semibold uppercase">Box 4</h1>
                                </div>
                                <div className="lg:flex flex-row gap-4 p-2">
                                    <div className="lg:flex-1">
                                        <AInput label="Aves fêmeas" id="box4_femea">
                                            <input
                                                id="box4_femea"
                                                name="box4_femea"
                                                {...register('box4_femea', {
                                                    required: {
                                                        value: "Required",
                                                        message: 'Digite o número de fêmeas!'
                                                    }
                                                })}
                                                type="text"
                                                placeholder=""
                                                className={`formatInput ${errors.box4_femea ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                            />
                                            {errors.box4_femea && errors.box4_femea?.type === 'required' && <BoxError text={errors.box4_femea.message} />}
                                        </AInput>
                                    </div>

                                    <div className="lg:flex-1">
                                        <AInput label="Aves machos" id="box4_macho">
                                            <input
                                                id="box4_macho"
                                                name="box4_macho"
                                                {...register('box4_macho', {
                                                    required: {
                                                        value: "Required",
                                                        message: 'Digite o número de machos!'
                                                    }
                                                })}
                                                type="text"
                                                placeholder=""
                                                className={`formatInput ${errors.box4_macho ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}`}
                                            />
                                            {errors.box4_macho && errors.box4_macho?.type === 'required' && <BoxError text={errors.box4_macho.message} />}
                                        </AInput>
                                    </div>

                                </div>
                            </div>

                        </ABoxFormBody>
                    </form>
                </ABoxBody>
            </ABoxAll>
        </Fragment>
    );
};

export default Create;
