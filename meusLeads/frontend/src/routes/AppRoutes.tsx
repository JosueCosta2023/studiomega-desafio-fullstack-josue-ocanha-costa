import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Painel from '../pages/Painel';
import Cadastrar from '@/pages/CadastrarUsuario';
import TableLeads from '@/components/TableLeads';
import Configuracao from '@/components/Configuracao';
import PrivateRoute from '@/components/PrivateRoute';
import AuthCallBack from '@/components/AuthCallBack';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/auth/callback" element={<AuthCallBack />} />
      <Route element={<PrivateRoute/>}>
        <Route path='/painel' element={<Painel/>}>
          <Route index element={<TableLeads/>}/>
          <Route  path='configuracao' element={<Configuracao/>}/>
        </Route>
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
