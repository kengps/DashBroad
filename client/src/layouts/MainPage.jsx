import React from "react";

import { Space } from "antd";
import SideMenu from "../components/SideMenu/Index";

import AppFooter from "../components/AppFooter/Index";
import PageContent from "../components/PageContent/Index";

import { Navigate, useRoutes } from "react-router-dom";

//Component


import Login from "../components/Login/LoginForm";
import Register from "../components/Register/Register";

import LineLiff from "../components/LineLiff/LineLiff";
import UserPage from "../pages/UserPage";
import WebScraping from "../pages/WebScraping";
import DayOff from "../components/Calendar/DayOff";
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
    {
      path: "/calendar-dayoff",
      element: <DayOff />,
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
