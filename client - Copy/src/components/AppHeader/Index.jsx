import { Badge, Space, Typography, Image } from "antd";
import React from "react";
import { BellFilled, MailOutlined } from "@ant-design/icons";
Image
const AppHeader = () => {
  return (
    <div className="AppHeader">
      <Image
        src=""
        alt=""
      />
      <Typography.Title level={2}>DashBoard Support Case</Typography.Title>
      <Space>
        <Badge count={10}>
          <MailOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge count={10}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </div>
  );
};

export default AppHeader;
