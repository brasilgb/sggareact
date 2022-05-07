import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Ciclo, Home, Lotes, LotesAdd } from './pages'

const AppRoutes = () => {
  return (
   <Routes>
       <Route path="/" element={ <Home /> } />
       <Route path="/ciclos" element={ <Ciclo /> } />
       <Route path="/lotes" element={ <Lotes /> } />
       <Route path="/lotesadd" element={ <LotesAdd /> } />
   </Routes>
  )
}

export default AppRoutes