import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/layouts/MainPage";
import App2 from "./components/NavbarFormcase/AgentName";
import CampGameAndEditor from "./components/NavbarFormcase/CampGameAndEditor";
import PageContent from "./components/PageContent/Index";
import DashBorad from "./components/pages/DashBoard";
import FormCase from "./components/pages/FormCase";
import ListCaseAll from "./components/pages/ListCaseAll";
import ListCaseUnResolve from "./components/pages/ListCaseUnResolve";
import ListUser from "./components/pages/ListUser";
import Register from "./components/pages/Register/Register";




const MyRouter = () => {
  return (
    <div className="AppRoutes">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBorad />} />
        <Route path="/3" element={<CampGameAndEditor />} />
        <Route path="/" element={<PageContent />} />
        <Route path="/formcontrol" element={<FormCase />} />
        <Route path="/listunresolve" element={<ListCaseUnResolve />} />
        <Route path="/listcase" element={<ListCaseAll />} />
        <Route path="/listuser" element={<ListUser />} />
      </Routes>
    </div>
  );
};

export default MyRouter;
