import React, { useContext, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import DataLoader from "../../contexts/DataLoader";

import ChartDataLabels from "chartjs-plugin-datalabels";
const PieChart = () => {
  const renderChart = (value) => {
    // const bioCount = value.filter(
    //   (item) => item.problem === "หลังบ้าน bio"
    // ).length;
    // const lsmCount = value.filter((item) => item.problem === "ขอ API").length;
    // const apiCount = value.filter(
    //   (item) => item.problem === "กลุ่ม lsm-Pretty Gaming"
    // ).length;
    // const otherCount = value.filter(
    //   (item) => item.problem === "เรื่องทั่วไป"
    // ).length;
    // const adminCount = value.map((item) => item.problem === "admin").length;
    // const userEnabledCount = value.filter(
    //   (item) => item.enabled === true
    // ).length;
    // const userDisabledCount = value.filter(
    //   (item) => item.enabled === false
    // ).length;

    // //map ข้อมูลมาแสดง
    // // สร้าง Set object เพื่อจัดการข้อมูลที่ซ้ำกัน
    // const problemNameSet = new Set(value.map((item) => item.problem));
    // // แปลง Set object เป็น Array
    // const problemName = Array.from(problemNameSet);

    const groupedData = value.reduce((acc, cur) => {
      acc[cur.problem] = acc[cur.problem] ? acc[cur.problem] + 1 : 1;
      return acc;
    }, {});

    console.log("ได้ชื่อมาหรือไม่", groupedData);

    const options = {
      plugins: {
        title: {
          display: true,
          text: "ประเภท",
        },
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += data;
            });
            let percentage = ((value * 100) / sum).toFixed(2) + "%";
            return percentage;
          },
          color: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 0, 255, 1)",
          ],
          labels: {
            title: {
              font: {
                size: "8",
                weight: "bold",
              },
            },
          },
        },
      },
    };

    const data = {
      labels: Object.keys(groupedData),
      datasets: [
        {
          hoverBackgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 0, 255, 1)",
          ],
          hoverBorderColor: "#666666",
          label: "# จำนวน",
          data: Object.values(groupedData),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 0, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 0, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return <Pie data={data} options={options} plugins={[ChartDataLabels]} />;
  };

  return (
    <div>
      <DataLoader children={renderChart} />
    </div>
  );
};

export default PieChart;
