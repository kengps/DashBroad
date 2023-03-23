import { Badge, Space, Typography } from "antd";
import React from "react";
import { BellFilled, MailOutlined } from "@ant-design/icons";
const AppHeader = () => {
  return (
    <div className="AppHeader">
      <Typography.Title>DashBoard</Typography.Title>
      <Space>
        <Badge count={10}>
          <MailOutlined style={{fontSize: 24}}/>
        </Badge >
        <Badge count={10}>

         <BellFilled style={{fontSize: 24}}/>
        </Badge>
      </Space>
    </div>
  );
};

export default AppHeader;
