import React from "react";
import AppRoutes from "../AppRoutes/Index";
import { FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
const PageContent = () => {

  const handleChangeBTN = () => {
    console.log('eiei');
  }
  return (
    <div className="PageContent">
      <AppRoutes />

      <FloatButton
        onClick={handleChangeBTN}
        icon={<QuestionCircleOutlined />}
        type="primary"
        style={{
          right: 24,
        }}
      />

    </div>
  );
};

export default PageContent;
