import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Painel from '../pages/Painel';
import Cadastrar from '@/pages/CadastrarUsuario';
import TableLeads from '@/components/TableLeads';
import Configuracao from '@/components/Configuracao';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path='/painel' element={<Painel/>}>
          <Route index element={<TableLeads/>}/>
          <Route  path='configuracao' element={<Configuracao/>}/>
        </Route>
        
        <Route path="/cadastrar" element={<Cadastrar />} />
      </Routes>
    </BrowserRouter>
  );
}
