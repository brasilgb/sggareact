import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api';
import moment from "moment";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const [redLogin, setRedLogin] = useState(false);

    const [lotes, setLotes] = useState([]);
    const [ciclos, setCiclos] = useState([]);

    const [loadList, setLoadList] = useState(true);
    const [loadButton, setLoadButton] = useState(false)

    const [dataFiltroIni, setDataFiltroIni] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [dataFiltroFin, setDataFiltroFin] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [searchFilial, setSearchFilial] = useState("false");

    function dataSearch(inicial, final, filial) {
        setDataFiltroIni(inicial);
        setDataFiltroFin(final);
        setSearchFilial(filial);

    }

    function dateFormat(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);
    }, []);

    function redirectRegister(link, time) {
        setTimeout(() => {
            setRedLogin(true);
            if (link) {
                navigate('/login');
            }
            setErrorMessage(false);
        }, time);
    }

    function clearReload(reset, time) {
        setTimeout(() => {
            setErrorMessage(false);
            reset();
        }, time);
    }

    async function registerUser(name, code, filial, password, reset) {
        setLoading(true);
        await api.post('register', { name: name, code: code, filial: filial, password: password })

            .then((usuario) => {
                if (usuario.data.Register.success) {
                    let udata = {
                        Message: usuario.data.Register.message
                    }
                    setErrorMessage(udata);
                    setLoading(false);
                    reset();
                    redirectRegister(true, 1500);
                } else {
                    let udata = {
                        Message: usuario.data.Register.message
                    }
                    setErrorMessage(udata);
                    setRedLogin(false);
                    setLoading(false);
                    redirectRegister(false, 5000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function login(code, password, reset) {
        setLoading(true);
        await api.post('login', { code: code, password: password })
            .then((usuario) => {

                if (usuario.data.sigIn.success) {
                    let udata = {
                        IdUsuario: usuario.data.sigIn.user.idusuario,
                        Name: usuario.data.sigIn.user.name,
                        Filial: usuario.data.sigIn.user.filial,
                        Type: usuario.data.sigIn.user.type,
                        Code: usuario.data.sigIn.user.code
                    };
                    setUser(udata);
                    localStorage.setItem("user", JSON.stringify(udata));
                    setLoading(false);
                    navigate("/");
                } else {
                    let udata = {
                        Message: usuario.data.sigIn.message
                    }
                    setErrorMessage(udata);
                    setLoading(false);
                    clearReload(reset, 5000);
                }
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login")
    };

    useEffect(() => {
        async function getCiclos() {
            await api.get('ciclos')
                .then((ciclos) => {
                    const lsort = ciclos.data.ciclos.sort((a, b) => a.lote > b.lote ? 1 : -1);
                    setCiclos(lsort);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getCiclos();
    }, []);

    useEffect(() => {
        async function getLotes() {
            await api.get('lotes')
                .then((lotes) => {
                    const lsort = lotes.data.lotes.sort((a, b) => a.lote > b.lote ? 1 : -1);
                    setLotes(lsort);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getLotes();
    }, []);

    // useEffect(() => {
    //     async function getUserAccess() {
    //         setLoadButton(true);
    //         await api.get('listusersaccess')
    //             .then((access) => {
    //                 if (searchFilial === "false") {
    //                     const userAccess = access.data.filter((fu) => (dateFormat(fu.created_at) >= dataFiltroIni & dateFormat(fu.created_at) <= dataFiltroFin));
    //                     userAccess.sort((a, b) => parseInt(a.uid) < parseInt(b.uid) ? 1 : -1);
    //                     setUserAccess(userAccess);
    //                     setLoadButton(false);
    //                 } else {
    //                     const userAccess = access.data.filter((fu) => (dateFormat(fu.created_at) >= dataFiltroIni & dateFormat(fu.created_at) <= dataFiltroFin & fu.usuario.Filial === searchFilial));
    //                     userAccess.sort((a, b) => parseInt(a.uid) < parseInt(b.uid) ? 1 : -1);
    //                     setUserAccess(userAccess);
    //                     setLoadButton(false);
    //                 }

    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }
    //     getUserAccess();
    // }, [dataFiltroIni, dataFiltroFin, searchFilial]);

    // useEffect(() => {
    //     async function getKpis() {
    //         await api.get('analisekpis')
    //             .then((kpis) => {
    //                 const kpi = kpis.data.filter((kpi) => (kpi.CodFilial === parseInt(numFilial)));
    //                 kpi.sort((a, b) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
    //                 setValuesKpis(kpi);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }
    //     getKpis();
    // }, [numFilial]);

    // // Kpis total
    // useEffect(() => {
    //     async function getKpisTotal() {
    //         await api.get('analisekpistotal')
    //             .then((kpis) => {
    //                 kpis.data.sort((a, b) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
    //                 setTotalValuesKpis(kpis.data);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }
    //     getKpisTotal();
    // }, []);


    return (
        <AuthContext.Provider value={{
            authenticated:
                !!user,
            user,
            // userAccess,
            loading,
            setErrorMessage,
            // setNumFilial,
            setSearchFilial,
            errorMessage,
            registerUser,
            login,
            logout,
            redLogin,
            setRedLogin,
            dataSearch,
            lotes,
            setLotes,
            ciclos,
            // numFilial,
            // valuesKpis,
            // totalValuesKpis,
            
            loadList,
            loadButton
        }}>
            {children}
        </AuthContext.Provider>
    )
}
