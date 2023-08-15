import React from "react";
import AppHeader from "../components/AppHeader/Index";

import { Space } from "antd";
import SideMenu from "../components/SideMenu/Index";

import PageContent from "../components/PageContent/Index";
import AppFooter from "../components/AppFooter/Index";

import { Navigate, useRoutes } from "react-router-dom";

//Component
import FormCase from "../pages/FormCase";
import ListCaseUnResolve from "../pages/ListCaseUnResolve";
import ListCaseAll from "../pages/ListCaseAll";
import ListUser from "../pages/ListUser";

import ChangPassword from "../pages/ChangPassword";

import Register from "../components/Register/Register";
import Login from "../components/Login/LoginForm";

import DashBorad from "../pages/DashBoard";
import IndexRouter from "../components/LoadingAndRedirect";
import WebScraping from "../pages/WebScraping";
import SettingProblem from "../components/SettingProblem";
import LineLiff from "../components/LineLiff/LineLiff";
import UserPage from "../pages/UserPage";
//import DashBoard from "../pages/DashBoard";
//IndexRouter คือ component ที่จะแสดงเมื่อไม่มีการ login


const MainPage = () => {
  const routes = useRoutes([
    {
      path: "/dashboard/*",
      element: (
        <div className="App">
          {/* <AppHeader /> */}
          <Space className="SideMenuAndPageContent">
            <SideMenu />
            <PageContent />
          </Space>
          <AppFooter />
        </div>
      ),
    },
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/outstanding",
      element: <WebScraping />,
    },
    {
      path: "/registeruser",
      element: <Register />,
    },

    {
      path: "*",
      element: <Navigate to="/dashboard/app" />,
    },
    {
      path: "/line",
      element: <LineLiff />,
    },
    {
      path: "/page-user",
      element: <UserPage />,
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
