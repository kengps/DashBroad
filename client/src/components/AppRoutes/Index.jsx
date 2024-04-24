import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

//Component
import DashBoard from "../../pages/DashBoard";
import FormCase from "../../pages/FormCase";
import ListCaseAll from "../../pages/ListCaseAll";
import ListCaseUnResolve from "../../pages/ListCaseUnResolve";
import ListUser from "../../pages/ListUser";
//import Register from "../pages/Register/Register";
import { useDispatch } from "react-redux";
import { currentUser } from "../../api/auth";
import ChangPassword from "../../pages/ChangPassword";
import WebScraping from "../../pages/WebScraping";
import Work from "../../pages/Work";
import IndexRouter from "../LoadingAndRedirect/Index";
import SettingEditor from "../../pages/SettingEditor";
import SettingProblemType from "../../pages/SettingProblemType";
import { storeAuth } from "../../service/store/storeZustand";
import DayOff from "../Calendar/DayOff";




const AppRoutes = () => {

  const { login, isAuthenticated, user, updateUserInfo, fetchUserInfo } = storeAuth()


  const idToken = localStorage.token; //token คือชื่อที่เราตั้ง

  useEffect(() => {
  
    fetchUserInfo(idToken)
    

  }, [])




  return (

    <IndexRouter>
      <Routes>
        <Route path="/app" element={<DashBoard />} />
        <Route path="/formcontrol" element={<FormCase />} />
        <Route path="/listunresolve" element={<ListCaseUnResolve />} />
        <Route path="/listcase" element={<ListCaseAll />} />
        <Route path="/listuser" element={<ListUser />} />
        <Route path="/reset-password" element={<ChangPassword />} />
        <Route path="/work" element={<Work />} />
        <Route path="/outstanding" element={<WebScraping />} />
        <Route path="/list-editor" element={<SettingEditor />} />
        <Route path="/create-type" element={<SettingProblemType />} />
        <Route path="/dayoff-events" element={<DayOff />} />

      </Routes>

    </IndexRouter>
  );
};

export default AppRoutes;
