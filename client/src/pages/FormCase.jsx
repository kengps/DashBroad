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
        <Typography.Title>ฟอร์มบันทึกเคส</Typography.Title>
      </div>
      <div className="FormCase">
        <FormComponent />
      </div>
    </div>
  );
};

export default FormCase;
