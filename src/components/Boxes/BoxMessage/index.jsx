import React, { Fragment, useEffect, useState } from 'react'
import 'animate.css';
const BoxMessage = ({ message, openanimate, closeanimate }) => {

    const [closeMessage, setCloseMessage] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            let element = document.getElementById("animatelayer");
            if (element.classList.contains(openanimate)) {
                element.classList.remove(openanimate)
                element.classList.add(closeanimate);
            }
        }, 5000)
    });

    return (
        <Fragment>
            
                {/* // <div id="animatelayer" class={`w-full text-white bg-emerald-500 animate__animated ${openanimate} animate__delay-0s`}> */}
                <div id="animatelayer" class={`flex w-full absolute left-1/2 max-w-sm mx-auto overflow-hidden bg-emerald-100 border-2 border-white rounded-lg shadow animate__animated ${openanimate} animate__delay-0s`}>
                <div class="flex items-center justify-center w-12 bg-emerald-500">
                    <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/>
                    </svg>
                </div>
                
                <div class="px-4 py-2 -mx-3">
                    <div class="mx-3">
                        <span class="font-semibold text-emerald-500">Successo</span>
                        <p class="text-md font-semibold text-gray-600">{ message }</p>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}

export default BoxMessage;