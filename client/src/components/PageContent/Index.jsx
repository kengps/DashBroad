import React from "react";
import AppRoutes from "../AppRoutes/Index";
import IndexRouter from "../LoadingAndRedirect";
import AdminRoute from "../LoadingAndRedirect/AdminRoute";


const PageContent = () => {
  return (
    <div className="PageContent">
     <AppRoutes />
    </div>
  );
};

export default PageContent;
