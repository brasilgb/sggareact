import React, { Fragment, useState } from 'react'
import { IoEggSharp, IoFileTrayStacked, IoHome, IoTime } from 'react-icons/io5';
import { FaCaretRight, FaTruck } from 'react-icons/fa';
import { GiChicken, GiPowderBag } from 'react-icons/gi'
// import { useLocation } from "react-router-dom";
import { ALink, ADropDown } from '../Links';
const Sidebar = () => {

    // const location = useLocation();
    // const { pathname } = location;
    // const splitLocation = pathname.split("/");

    // console.log(splitLocation[1]);



    return (
        <Fragment>
            <div 
            className="fixed h-screen w-0 lg:w-64  transition duration-300 overflow-y-auto"
            style={{backgroundColor: "#0D2237"}}
            >
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <img className="w-14" src="/logo192.png" alt="Logo" />

                        <span className="text-white text-2xl mx-2 font-semibold">Dashboard</span>
                    </div>
                </div>

                <nav className="mt-10">

                    <ALink
                        url=""
                        label="Home"
                        active=""
                        icon={<IoHome />}
                    />
                    <ALink
                        url="ciclos"
                        label="Ciclos"
                        active="ciclos"
                        icon={<IoTime />}
                    />

                    <ADropDown
                        label="Lotes/Aviários"
                        url="#"
                        active={[{ "l": "lotes" }, { "l": "aviarios" }]}
                        position={1}
                        icon={<IoFileTrayStacked />}
                    >
                        <ALink
                            label="Lotes"
                            url="/lotes"
                            icon={<FaCaretRight />}
                        />
                        <ALink
                            label="Aviarios"
                            url="/aviarios"
                            icon={<FaCaretRight />}
                        />
                    </ADropDown>

                    <ALink
                        label="Coletas"
                        url="coletas"
                        active="coletas"
                        icon={<IoEggSharp />}
                    />
                    <ALink
                        label="Envio de Ovos"
                        url="envios"
                        active="envios"
                        icon={<FaTruck />}
                    />

                    <ADropDown
                        label="Aves"
                        url="#"
                        active={[{ "l": "mortalidades" }, { "l": "pesagens" }]}
                        position={2}
                        icon={<GiChicken />}
                    >
                        <ALink
                            label="Mortalidades"
                            url="/mortalidades"
                        />
                        <ALink
                            label="Pesagens"
                            url="/pesagens"
                        />
                    </ADropDown>

                    <ADropDown
                        label="Ração"
                        url="#"
                        active={[{ "l": "recebimentos" }, { "l": "consumos" }]}
                        position={2}
                        icon={<GiPowderBag />}
                    >
                        <ALink
                            label="Recebimentos"
                            url="/recebimentos"
                        />
                        <ALink
                            label="Consumo"
                            url="/consumos"
                        />
                    </ADropDown>

                </nav>
            </div>
        </Fragment>
    )
}

export default Sidebar;