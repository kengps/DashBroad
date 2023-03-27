import React from "react";
import FormComponent from "../FormComponent";
import { Typography } from "antd";
const FormCase = () => {
  return (
    <div>
      <div>
        <Typography.Title>ฟอร์มบันทึกเคส</Typography.Title>
      </div>
      <div className="FormCase">
        <FormComponent />
      </div>
    </div>
  );
};

export default FormCase;
