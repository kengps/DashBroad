import React from "react";
import { Route, Routes,Navigate} from "react-router-dom";

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
  return(
    <Routes>
      <Route path='/app' element={<DashBoard />} />
        <Route path='/formcontrol' element={<FormCase />} />
        <Route path='/listunresolve' element={<ListCaseUnResolve />} />
        <Route path='/listcase' element={<ListCaseAll />} />
        <Route path='/listuser' element={<ListUser />} />
        <Route path='/reset-password' element={<ChangPassword />} />
    </Routes>
  );
};


// function DashboardRoutes() {
//   return (
//     <div>
//       <Routes>
//         <Route path='/app' element={<DashBoard />} />
//         <Route path='/formcontrol' element={<FormCase />} />
//         <Route path='/listunresolve' element={<ListCaseUnResolve />} />
//         <Route path='/listcase' element={<ListCaseAll />} />
//         <Route path='/listuser' element={<ListUser />} />
//         <Route path='/reset-password' element={<ChangPassword />} />
//       </Routes>
//     </div>
//   );
// }
export default AppRoutes;
