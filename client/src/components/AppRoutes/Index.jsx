import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Component
import DashBoard from "../../pages/DashBoard";
import FormCase from "../../pages/FormCase";
import ListCaseUnResolve from "../../pages/ListCaseUnResolve";
import ListCaseAll from "../../pages/ListCaseAll";
import ListUser from "../../pages/ListUser";
//import Register from "../pages/Register/Register";
import ChangPassword from "../../pages/ChangPassword";
import { currentUser } from "../../api/auth";
import { useDispatch } from "react-redux";
import IndexRouter from "../LoadingAndRedirect";
import Password from "antd/es/input/Password";


const AppRoutes = () => {
  const idToken = localStorage.token; //token คือชื่อที่เราตั้ง

  const dispatch = useDispatch();

  if (idToken) {
    console.log("idToken : " + idToken);
    currentUser(idToken)
      .then((response) => {
        dispatch({
          type: "LOGIN",
          payload: {
            token: idToken,
            username: response.data.username,
            role: response.data.role,
            id: response.data._id,
          
          },
        });
        console.log("response ", response);
      })
      .catch((err) => console.log(err));
  }

  return (
  <IndexRouter>
    <Routes>
      <Route path="/app" element={<DashBoard />} />
      <Route path="/formcontrol" element={<FormCase />} />
      <Route path="/listunresolve" element={<ListCaseUnResolve />} />
      <Route path="/listcase" element={<ListCaseAll />} />
      <Route path="/listuser" element={<ListUser />} />
      <Route path="/reset-password" element={<ChangPassword />} />
    </Routes>
  </IndexRouter>
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
