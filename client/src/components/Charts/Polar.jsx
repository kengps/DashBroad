import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import "chart.js/auto";

import { SiMicrosoftexcel } from "react-icons/all";
import { listUser } from "../../api/user";
import DataLoader from "../../contexts/DataLoader";
import ChartDataLabels from "chartjs-plugin-datalabels";
const Polar = () => {
  const renderChart = (value) => {
    const groupedData = value.reduce((acc, cur) => {
      acc[cur.status] = acc[cur.status] ? acc[cur.status] + 1 : 1;
      return acc;
    }, {});

    console.log("Polar ได้ชื่อมาหรือไม่", groupedData);

    const options = {
      plugins: {
        title: {
          display: true,
          text: "จำนวนเคสทั้งหมด",
        },
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += data;
            });
            let percentage = ((value * 100) / sum).toFixed(2) + "%";
            return `${percentage} (${value})`; // แสดงเปอร์เซ็นต์และตัวเลขในกราฟ
          },
          color: "#000", // กำหนดสีตัวอักษรเป็นสีขาว
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
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          hoverBorderColor: "#666666",
          label: "# จำนวน",
          data: Object.values(groupedData),
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };

    return (
      <PolarArea data={data} options={options} plugins={[ChartDataLabels]} />
    );
  };

  return (
    <div>
      <DataLoader children={renderChart} />
    </div>
  );
};

export default Polar;
