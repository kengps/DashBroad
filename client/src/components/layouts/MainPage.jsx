import React from "react";
import AppHeader from "../AppHeader/Index";

import { Space } from "antd";
import SideMenu from "../SideMenu/Index";
import PageContent from "../PageContent/Index";
import AppFooter from "../AppFooter/Index";
import Register from "../pages/Register/Register";
import { Navigate, useRoutes } from "react-router-dom";


//Component
import DashBoard from "../pages/DashBoard";
import FormCase from "../pages/FormCase";
import ListCaseUnResolve from "../pages/ListCaseUnResolve";
import ListCaseAll from "../pages/ListCaseAll";
import ListUser from "../pages/ListUser";

import ChangPassword from "../pages/ChangPassword";


const MainPage = () => {
  const routes = useRoutes([
    {
      path: "/dashboard/*",
      element: (
        <div className="App">
          <AppHeader />
          <Space className="SideMenuAndPageContent">
            <SideMenu />
            <PageContent />
          </Space>
          <AppFooter />
        </div>
      )
    },
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "*",
      element: <Navigate to="/dashboard" />,
    },
  ]);

  return routes;
};
export default MainPage;

// const MainPage = () => {
//   return (
//     <div className="App">
//       <AppHeader />
//       <Space className="SideMenuAndPageContent">
//         <SideMenu />
//         <PageContent />
//       </Space>
//       <AppFooter />
//     </div>
//   );
// };

// export default MainPage;
