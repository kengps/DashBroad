import React from "react";
import { Route, Routes } from "react-router-dom";
// import MainPage from "./components/layouts/MainPage";
import App2 from "./components/NavbarFormcase/AgentName";
import CampGameAndEditor from "./components/NavbarFormcase/CampGameAndEditor";
//import PageContent from "./components/PageContent/Index";
//import DashBorad from "./components/pages/DashBoard";
import FormCase from "./pages/FormCase";
import ListCaseAll from "./pages/ListCaseAll";
import ListCaseUnResolve from "./pages/ListCaseUnResolve";
import ListUser from "./pages/ListUser";
import Register from "./components/Register/Register";
import DashBorad from "./pages/DashBoard";
import PageContent from "./components/PageContent/Index";




const MyRouter = () => {
  return (
    <div className="AppRoutes">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBorad />} />
       
        <Route path="/formcontrol" element={<FormCase />} />
        <Route path="/listunresolve" element={<ListCaseUnResolve />} />
        <Route path="/listcase" element={<ListCaseAll />} />
        <Route path="/listuser" element={<ListUser />} />
      </Routes>
    </div>
  );
};

export default MyRouter;
