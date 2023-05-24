import {
  DollarCircleFilled,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic } from "antd";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
//import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import Pies from "../components/Charts/Pie";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { Grid, Container, Typography } from "@mui/material";
import Lines from "../components/Charts/Line";
import Charts from "../components/Charts/Chart";
import Bars from "../components/Charts/Bar";
import Doughnuts from "../components/Charts/Doughnut";
import PieChart from "../components/Charts/PieChart";
import BarChart from "../components/Charts/BarChart";
import Polar from "../components/Charts/Polar";
import BarHorizontal from "../components/Charts/BarHorizontal";
import LineRecorder from "../components/Charts/LineRecorder";

const DashBorad = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          DashBoard
        </Typography>

        {/* Pie Chart แสดงข้อมูลประเภท */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Item>
              <PieChart />
            </Item>
          </Grid>
          {/* Doughnuts Chart แสดงข้อมูลรายละเอียด */}
          <Grid item xs={12} md={6} lg={4}>
            <Item>
              <Doughnuts />
            </Item>
          </Grid>
          {/* Polar Chart แสดงข้อมูลจำนวนเคสทั้งหมด */}
          <Grid item xs={12} md={6} lg={4}>
            <Item>
              <Polar />
            </Item>
          </Grid>

          {/* Lines Chart แสดงข้อมูลจำนวนเคสทั้งหมด */}
          <Grid item xs={12} md={6} lg={6}>
            <Item>
              <Lines />
            </Item>
          </Grid>

          {/* Bars Chart แสดงข้อมูลรายละเอียดแบบรายเดือน */}
          <Grid item xs={12} md={6} lg={6}>
            <Item>
              <Bars />
            </Item>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Item>
              <BarHorizontal />
            </Item>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Item>
              <LineRecorder />
            </Item>
          </Grid>

          {/* BarChart  แสดงข้อมูลจำนวนค่ายเกมทั้งหมด */}
          <Grid item xs={12} md={6} lg={12}>
            <Item>
              <BarChart />
            </Item>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const DashBoradShop = ({ title, value, icon }) => {
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

{
  /* <DashBoradShop
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
                backgroundColor: "rgba(0,0,0,0)",
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
        /> */
}
