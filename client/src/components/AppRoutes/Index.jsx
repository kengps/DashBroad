import React from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Component
import DashBoard from "../pages/DashBoard";
import FormCase from "../pages/FormCase";
import ListCaseUnResolve from "../pages/ListCaseUnResolve";
import ListCaseAll from "../pages/ListCaseAll";
import ListUser from "../pages/ListUser";
import Register from "../pages/Register/Register";
import ChangPassword from "../pages/ChangPassword";

const AppRoutes = () => {
  return (
    
    <div className="AppRoutes">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/formcontrol" element={<FormCase />} />
        <Route path="/listunresolve" element={<ListCaseUnResolve />} />
        <Route path="/listcase" element={<ListCaseAll />} />
        <Route path="/listuser" element={<ListUser />} />
        <Route path="/reset-password" element={<ChangPassword />} />
      
      </Routes>
    </div>
  );
};

export default AppRoutes;
