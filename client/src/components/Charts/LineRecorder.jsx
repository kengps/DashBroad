import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";
import { listUser } from "../../api/user";
import { listCases2 } from "../../api/case";
import moment from "moment";

import DataLoader from "../../contexts/DataLoader";
import ChartDataLabels from "chartjs-plugin-datalabels";

const LineRecorder = () => {
  const getChartData = (value) => {
    const problemsByMonth = value.reduce((acc, curr) => {
      const date = moment(curr.createdAt).locale("th");
      const month = date.month() + 1;
      const problem = curr.recorder;
      if (!acc[month]) {
        acc[month] = {};
      }
      if (!acc[month][problem]) {
        acc[month][problem] = 0;
      }
      acc[month][problem]++;
      return acc;
    }, {});
    const getMonthName = (month) => {
      return moment()
        .month(month - 1)
        .format("MMMM");
    };

    const labels = [];
    const bioData = [];
    const lsmData = [];
    const apiData = [];
    const otherData = [];

    for (let i = 1; i <= 12; i++) {
      const monthData = problemsByMonth[i] || {};
      const monthLabel = getMonthName(i);
      labels.push(monthLabel);

      let totalData = 0;
      Object.values(monthData).forEach((count) => {
        totalData += count;
      });

      // เพิ่มค่าลงในชุดข้อมูลที่เหมือนกันทุกประเภทของปัญหา
      Object.keys(monthData).forEach((problem) => {
        const problemCount = monthData[problem];
        const problemIndex = labels.length - 1;

        if (!bioData[problemIndex]) {
          bioData[problemIndex] = 0;
        }
        if (!lsmData[problemIndex]) {
          lsmData[problemIndex] = 0;
        }
        if (!apiData[problemIndex]) {
          apiData[problemIndex] = 0;
        }
        if (!otherData[problemIndex]) {
          otherData[problemIndex] = 0;
        }

        // หากต้องการเพิ่มประเภทของปัญหาเพิ่มเติม สามารถเพิ่มเงื่อนไขได้ตามต้องการ
        if (problem === "kengzer1") {
          bioData[problemIndex] += problemCount;
        } else if (problem === "kengzer2") {
          lsmData[problemIndex] += problemCount;
        } else if (problem === "kengzer3") {
          apiData[problemIndex] += problemCount;
        } else {
          otherData[problemIndex] += problemCount;
        }
      });
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "จำนวนผู้ลงเคสแบบรายเดือน",
        },
        datalabels: {
          anchor: "end",
          align: "top",
          formatter: function (value) {
            if (value !== 0) {
              return value.toString();
            } else {
              return "";
            }
          },
        },
      },
    };
    const data = {
      labels,
      datasets: [
        {
          label: "kengzer1",
          data: bioData,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
        {
          label: "kengzer2",
          data: lsmData,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 1,
        },
        {
          label: "kengzer3",
          data: apiData,
          backgroundColor: "rgba(54, 162, 235, 0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "kengzer4",
          data: otherData,
          backgroundColor: "rgba(153, 102, 255, 0.4)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
    return <Line data={data} options={options} plugins={[ChartDataLabels]} />;
  };

  return (
    <div>
      <DataLoader children={getChartData} />
    </div>
  );
};

export default LineRecorder;
