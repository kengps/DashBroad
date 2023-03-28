import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/DashBoard'
import FormCase from '../pages/FormCase'
import ListCaseUnResolve from '../pages/ListCaseUnResolve'
import ListCaseAll from '../pages/ListCaseAll'
import ListUser from '../pages/ListUser'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = () => {
  return (
    <div className="AppRoutes">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/formcontrol" element={<FormCase />} />
        <Route path="/listunresolve" element={<ListCaseUnResolve />} />
        <Route path="/listcase" element={<ListCaseAll />} />
        <Route path="/listuser" element={<ListUser />} />
      </Routes>
    </div>
  );
}

export default AppRoutes