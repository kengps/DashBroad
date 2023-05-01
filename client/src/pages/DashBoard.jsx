import { DollarCircleFilled, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import React from "react";

const DashBorad = () => {
  return (
    <div>
      <Typography.Title>DashBoard</Typography.Title>
      <Space direction="horizontal">
        <DashBoradShop
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 25,
                padding: 8,
              }}
            />
          }
          title={"Case"}
          value={123123}
        />
        <DashBoradShop
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: 'rgba(0,0,0,0)',
                borderRadius: 20,
                fontSize: 25,
                padding: 8,
              }}
            />
          }
          title={"Case1"}
          value={123123}
        />
        <DashBoradShop
          icon={
            <DollarCircleFilled
              style={{
                color: "red",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 25,
                padding: 8,
              }}
            />
          }
          title={"Case2"}
          value={123123}
        />
      </Space>
    </div>
  );
};

const DashBoradShop = ({title , value , icon}) => {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value}></Statistic>
      </Space>
    </Card>
  );
};

export default DashBorad;
