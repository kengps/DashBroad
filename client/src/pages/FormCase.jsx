import React from "react";
import FormComponent from "../components/FormComponent";
import { Typography } from "antd";
import { Helmet } from "react-helmet-async";
const FormCase = () => {
  return (
    <div>
      <div>
        <Helmet>
          <title> Dashboard | FormCase </title>
        </Helmet>
      
      </div>
      <div className="FormCase mt-5">
        <FormComponent />
      </div>
    </div>
  );
};

export default FormCase;
