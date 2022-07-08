import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
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
import { useParams } from 'react-router-dom';

import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {

    const { ciclos, lotes, aviarios, setAviarios } = useContext(AuthContext);

    const { idaviario } = useParams();

    const resAviarios = aviarios.filter((lt) => (parseInt(lt.aviarioId) === parseInt(idaviario)));

    const [value, onChange] = useState(resAviarios[0].data_entrada);

    const cl = ciclos.filter((ci) => ci.ativo == 1);

    const preloadedValues = {
        loteId: resAviarios[0].loteId,
        aviario: resAviarios[0].aviario,
        box1_femea: resAviarios[0].box1_femea,
        box2_femea: resAviarios[0].box2_femea,
        box3_femea: resAviarios[0].box3_femea,
        box4_femea: resAviarios[0].box4_femea,
        box1_macho: resAviarios[0].box1_macho,
        box2_macho: resAviarios[0].box2_macho,
        box3_macho: resAviarios[0].box3_macho,
        box4_macho: resAviarios[0].box4_macho,
    }

    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        defaultValues: preloadedValues
    });

    async function onSubmit(data) {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYW5kZXJzb25AZW1haWwuY29tIiwiaWF0IjoxNjUyMDExMjkzfQ.A0eSi-xafALrywZCcQXHYXmSxeN8ncGVIn2pcaz0goo";
        await api.patch('aviarios', {
            "aviarioId": parseInt(idaviario),
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
                const index = aviarios.findIndex(object => {
                    return object.aviarioId === parseInt(idaviario);
                });
                if (index < 0) {
                    console.log('Não Têm...');
                }
                let ltemp = aviarios;
                ltemp[index] = {
                    "aviarioId": parseInt(idaviario),
                    "lote": response.data.lote,
                    "aviario": data.aviario,
                    "aviariosNumber": response.data.aviarios,
                    "data_entrada": moment(value).format('YYYY-MM-DD'),
                    "totl_femea": parseInt(data.box1_femea) + parseInt(data.box2_femea) + parseInt(data.box3_femea) + parseInt(data.box4_femea),
                    "totl_macho": parseInt(data.box1_macho) + parseInt(data.box2_macho) + parseInt(data.box3_macho) + parseInt(data.box4_macho)
                }
                setAviarios(ltemp);
                toast.success(response.data.message, {
                    transition: Slide
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Fragment>
            <ToastContainer position="top-right" autoClose={2000} />
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
                    <AButtomBack url="/aviarios" state={setAviarios} />
                    <AInputSearch place="Buscar por aviario" />
                </ABoxHeader>

                <ABoxBody>
                    <form onSubmit={handleSubmit(onSubmit)} >

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

                            <AInput label="Lotes" id="loteId">
                                <select
                                    id="loteId"
                                    name="loteId"
                                    {...register('loteId', {
                                        required: {
                                            value: "Required",
                                            message: 'Selecione o lote!'
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
                                {/* {errorMessage && <BoxError text={errorMessage} />} */}
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

export default Update;
