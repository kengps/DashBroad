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
    const problemsByRecorder = value.reduce((acc, curr) => {
      const problem = curr.recorder;
      if (!acc[problem]) {
        acc[problem] = {};
      }
      const date = moment(curr.createdAt).locale("th");
      const month = date.month() + 1;
      if (!acc[problem][month]) {
        acc[problem][month] = 0;
      }
      acc[problem][month]++;
      return acc;
    }, {});
  
    const recorders = Object.keys(problemsByRecorder);
    const months = moment.months();
  
    const labels = recorders.map((recorder) => `${recorder}`);
  
    const datasets = recorders.map((recorder, index) => {
      const recorderData = months.map((month, monthIndex) => {
        const monthData = problemsByRecorder[recorder][monthIndex + 1] || 0;
        return monthData;
      });
  
      const backgroundColor = [
        "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(255, 0, 255, 0.2)",
      "rgba(99, 165, 255, 0.2)",
      "rgba(101, 99, 255, 0.2)",
      "rgba(88, 214, 141 , 0.2)",
      "rgba(229, 152, 102, 0.2)",
      "rgba(192, 57, 43, 0.2)",
      "rgba(231, 76, 60 , 0.2)",
      "rgba(155, 89, 182, 0.2)",
      "rgba(22, 160, 133 , 0.2)",
      ];
      const borderColor = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 0, 255, 1)",
        "rgba(99, 165, 255, 1)",
        "rgba(101, 99, 255, 1)",
        "rgba(88, 214, 141 , 1)",
        "rgba(229, 152, 102, 1)",
        "rgba(192, 57, 43, 1)",
        "rgba(231, 76, 60 , 1)",
        "rgba(155, 89, 182, 1)",
        "rgba(22, 160, 133  , 1)",
      ];
  
      const dataset = {
        label: labels[index],
        data: recorderData,
        backgroundColor: backgroundColor[index],
        borderColor: borderColor[index],
        borderWidth: 1,
      };
  
      return dataset;
    });
  
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
      scales: {
        x: {
          display: true,
          ticks: {
            callback: function (value, index) {
              const monthName = months[index];
              return index === 0 ? "" : monthName;
            },
          },
        },
      },
    };
  
    const data = {
      labels: months,
      datasets,
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




{/*FIXME: ข้อมูลโดยกำหนดตัวแปล


// const LineRecorder = () => {
//   const getChartData = (value) => {
//     const problemsByMonth = value.reduce((acc, curr) => {
//       const date = moment(curr.createdAt).locale("th");
//       const month = date.month() + 1;
//       const problem = curr.recorder;
//       if (!acc[month]) {
//         acc[month] = {};
//       }
//       if (!acc[month][problem]) {
//         acc[month][problem] = 0;
//       }
//       acc[month][problem]++;
//       return acc;
//     }, {});
//     const getMonthName = (month) => {
//       return moment()
//         .month(month - 1)
//         .format("MMMM");
//     };

//     const labels = [];
//     const bioData = [];
//     const lsmData = [];
//     const apiData = [];
//     const otherData = [];

//     for (let i = 1; i <= 12; i++) {
//       const monthData = problemsByMonth[i] || {};
//       const monthLabel = getMonthName(i);
//       labels.push(monthLabel);

//       let totalData = 0;
//       Object.values(monthData).forEach((count) => {
//         totalData += count;
//       });

//       // เพิ่มค่าลงในชุดข้อมูลที่เหมือนกันทุกประเภทของปัญหา
//       Object.keys(monthData).forEach((problem) => {
//         const problemCount = monthData[problem];
//         const problemIndex = labels.length - 1;

//         if (!bioData[problemIndex]) {
//           bioData[problemIndex] = 0;
//         }
//         if (!lsmData[problemIndex]) {
//           lsmData[problemIndex] = 0;
//         }
//         if (!apiData[problemIndex]) {
//           apiData[problemIndex] = 0;
//         }
//         if (!otherData[problemIndex]) {
//           otherData[problemIndex] = 0;
//         }

//         // หากต้องการเพิ่มประเภทของปัญหาเพิ่มเติม สามารถเพิ่มเงื่อนไขได้ตามต้องการ
//         if (problem === "kengzer1") {
//           bioData[problemIndex] += problemCount;
//         } else if (problem === "kengzer2") {
//           lsmData[problemIndex] += problemCount;
//         } else if (problem === "kengzer3") {
//           apiData[problemIndex] += problemCount;
//         } else {
//           otherData[problemIndex] += problemCount;
//         }
//       });
//     }

//     const options = {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "right",
//         },
//         title: {
//           display: true,
//           text: "จำนวนผู้ลงเคสแบบรายเดือน",
//         },
//         datalabels: {
//           anchor: "end",
//           align: "top",
//           formatter: function (value) {
//             if (value !== 0) {
//               return value.toString();
//             } else {
//               return "";
//             }
//           },
//         },
//       },
//     };
//     const data = {
//       labels,
//       datasets: [
//         {
//           label: "kengzer1",
//           data: bioData,
//           backgroundColor: "rgba(75,192,192,0.4)",
//           borderColor: "rgba(75,192,192,1)",
//           borderWidth: 1,
//         },
//         {
//           label: "kengzer2",
//           data: lsmData,
//           borderColor: "rgb(255, 99, 132)",
//           backgroundColor: "rgba(255, 99, 132, 0.5)",
//           borderWidth: 1,
//         },
//         {
//           label: "kengzer3",
//           data: apiData,
//           backgroundColor: "rgba(54, 162, 235, 0.4)",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//         },
//         {
//           label: "kengzer4",
//           data: otherData,
//           backgroundColor: "rgba(153, 102, 255, 0.4)",
//           borderColor: "rgba(153, 102, 255, 1)",
//           borderWidth: 1,
//         },
//       ],
//     };
//     return <Line data={data} options={options} plugins={[ChartDataLabels]} />;
//   };

//   return (
//     <div>
//       <DataLoader children={getChartData} />
//     </div>
//   );
// };
*/}



