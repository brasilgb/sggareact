import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { 
  Ciclo, 
  Home, 
  Lotes, 
  LotesAdd, 
  LotesEdit,
  Aviarios, 
  AviariosAdd, 
  AviariosEdit 
} from './pages'

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ciclos" element={<Ciclo />} />
      <Route path="/lotes" element={<Lotes />} />
      <Route path="/lotes/create" element={<LotesAdd />} />
      <Route path="/lotes/:idlote" element={<LotesEdit />} />
      <Route path="/aviarios" element={<Aviarios />} />
      <Route path="/aviarios/create" element={<AviariosAdd />} />
      <Route path="/aviarios/:idaviario" element={<AviariosEdit />} />
    </Routes>
  )
};

export default AppRoutes;