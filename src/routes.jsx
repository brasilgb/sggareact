import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator';
import { AuthContext } from './contexts/auth';
import { Ciclo, Home, Lotes, LotesAdd, LotesEdit } from './pages'

const AppRoutes = () => {
  const { loading, setLoading } = useContext(AuthContext);

  TopBarProgress.config({
    barColors: {
      "0": "#fff",
      "1.0": "#fff"
    },
    shadowBlur: 5
  });

    if(loading){
        return(
            <TopBarProgress/>
        );
    }

  return (
   <Routes>
       <Route path="/" element={ <Home /> } />
       <Route path="/ciclos" element={ <Ciclo /> } />
       <Route path="/lotes" element={ <Lotes /> } />
       <Route path="/lotes/create" element={ <LotesAdd /> } />
       <Route path="/lotes/:idlote" element={ <LotesEdit /> } />
   </Routes>
  )
};

export default AppRoutes;