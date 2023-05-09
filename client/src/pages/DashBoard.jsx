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

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Item>
              <PieChart />
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Item>
              <Doughnuts />
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Item>
              <Pies />
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Item>
              <Pies />
            </Item>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Item>
              <Lines />
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Item>
              <Pies />
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Item>
              <Bars />
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Item>
              <Doughnuts />
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
