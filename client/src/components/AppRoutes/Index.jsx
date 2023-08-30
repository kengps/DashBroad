import React from "react";
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
import IndexRouter from "../LoadingAndRedirect";
import SettingEditor from "../../pages/SettingEditor";
import SettingProblemType from "../../pages/SettingProblemType";



const AppRoutes = () => {
  const idToken = localStorage.token; //token คือชื่อที่เราตั้ง

  const dispatch = useDispatch();

  if (idToken) {
    // console.log("idToken : " + idToken);
    currentUser(idToken)
      .then((response) => {
        dispatch({
          type: "LOGIN",
          payload: {
            token: idToken,
            username: response.data.username,
            role: response.data.role,
            id: response.data._id,
            picture: response.data.pictureUrl,

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
        <Route path="/work" element={<Work />} />
        <Route path="/outstanding" element={<WebScraping />} />
        <Route path="/list-editor" element={<SettingEditor />} />
        <Route path="/create-type" element={<SettingProblemType />} />

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
