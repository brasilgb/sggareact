import React, { Fragment, useState } from 'react'
import { IoEggSharp, IoFileTrayStacked, IoHome, IoTime } from 'react-icons/io5';
import { FaCaretRight, FaTruck } from 'react-icons/fa';
import { GiChicken, GiPowderBag } from 'react-icons/gi'
import { useLocation } from "react-router-dom";
import { ALink, ADropDown } from '../Links';
const Sidebar = () => {

    // const location = useLocation();
    // const { pathname } = location;
    // const splitLocation = pathname.split("/");

    // console.log(splitLocation[1]);



    return (
        <Fragment>
            <div 
            className="fixed z-30 inset-y-0 left-0 w-72 transition duration-300 transform  overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
            style={{backgroundColor: "#0D2237"}}
            >
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <svg className="h-12 w-12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z" fill="#4C51BF" stroke="#4C51BF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z" fill="white"></path>
                        </svg>

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