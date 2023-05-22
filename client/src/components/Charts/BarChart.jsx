// import React, { useContext, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import DataLoader from "../../contexts/DataLoader";
// import faker from "faker";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// const BarChart = () => {
//   const renderChart = (value) => {
//     // แปลงข้อมูล createdAt เป็นเดือน
//     const monthData = value.map((item) => {
//       const createdAt = new Date(item.createdAt);
//       const monthIndex = createdAt.getMonth();
//       const monthNames = [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//       ];
//       const monthName = monthNames[monthIndex];
//       return monthName;
//     });

//     const groupedData = value.reduce((acc, cur) => {
//       acc[cur.campgame] = acc[cur.campgame] ? acc[cur.campgame] + 1 : 1;
//       return acc;
//     }, {});

//     const groupedMonth= monthData.reduce((acc, cur) => {
//         acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
//         return acc;
//       }, {});

//     console.log("ได้ชื่อมาหรือไม่", groupedData);
//     console.log("ได้ชื่อมาหรือไม่", groupedMonth);
//     const labels1 = Object.keys(groupedData);
//     const data1 = Object.values(groupedData);

//     const options = {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         title: {
//           display: true,
//           text: "เปรียบเทียบปริมาณค่ายเกมที่พบปัญหา (รายเดือน) ",
//         },
//       },
//     };

//     const labels = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//     ];

//     const data = {
//       labels,
//       datasets: [
//         {
//           label: "Dataset 1",
//           data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//           backgroundColor: ["rgba(255, 99, 132, 0.2)"],
//           borderColor: ["rgba(255, 99, 132, 1)"],
//         },
//         {
//           label: "Dataset 2",
//           data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//           backgroundColor: ["rgba(54, 162, 235, 0.2)"],
//           borderColor: ["rgba(54, 162, 235, 1)"],
//         },
//         {
//           label: "Dataset 3",
//           data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//           backgroundColor: ["rgba(255, 206, 86, 0.2)"],
//           borderColor: ["rgba(255, 206, 86, 1)"],
//         },
//         {
//           label: "Dataset 4",
//           data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//           backgroundColor: ["rgba(75, 192, 192, 0.2)"],
//           borderColor: ["rgba(75, 192, 192, 1)"],
//         },
//       ],
//     };

//     return <Bar data={data} options={options} plugins={[ChartDataLabels]} />;
//   };

//   return (
//     <div>
//       <DataLoader children={renderChart} />
//     </div>
//   );
// };

// export default BarChart;
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";
import { listUser } from "../../api/user";
import { listCases2 } from "../../api/case";
import moment from "moment";
import ChartDataLabels from "chartjs-plugin-datalabels";
//! ข้อมูลกลุ่ม
// const BarChart = () => {
//   const [value, setValue] = useState([]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = () => {
//     listCases2()
//       .then((res) => {
//         setValue(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getChartData = () => {
//     const getMonthName = (month) => {
//       return moment()
//         .month(month - 1)
//         .format("MMMM");
//     };

//     const problemsByMonth = value.reduce((acc, curr) => {
//       const date = moment(curr.createdAt).locale("th");
//       const month = date.month() + 1;
//       const problem = curr.problem;
//     //   console.log('curr',curr.campgame);
//       if (!acc[month]) {
//         acc[month] = {};
//       }
//       if (!acc[month][problem]) {
//         acc[month][problem] = 0;
//       }
//       acc[month][problem]++;
//       return acc;
//     }, {});

//     const problemTypes = [
//       {
//         label: "หลังบ้าน bio",
//         key: "หลังบ้าน bio",
//         backgroundColor: "rgba(75,192,192,0.4)",
//         borderColor: "rgba(75,192,192,1)",
//       },
//       {
//         label: "กลุ่ม lsm-Pretty Gaming",
//         key: "กลุ่ม lsm-Pretty Gaming",
//         backgroundColor: "rgba(255,99,132,0.4)",
//         borderColor: "rgba(255,99,132,1)",
//       },
//       {
//         label: "ขอ API",
//         key: "ขอ API",
//         backgroundColor: "rgba(54, 162, 235, 0.4)",
//         borderColor: "rgba(54, 162, 235, 1)",
//       },
//       {
//         label: "เรื่องทั่วไป",
//         key: "เรื่องทั่วไป",
//         backgroundColor: "rgba(153, 102, 255, 0.4)",
//         borderColor: "rgba(153, 102, 255, 1)",
//       },
//     ];

//     const labels = [];
//     const datasets = problemTypes.map((problemType) => ({
//       label: problemType.label,
//       data: [],
//       backgroundColor: problemType.backgroundColor,
//       borderColor: problemType.borderColor,
//       borderWidth: 1,
//     }));

//     for (let i = 1; i <= 12; i++) {
//       const monthData = problemsByMonth[i] || {};
//       const monthLabel = getMonthName(i);
//       labels.push(monthLabel);

//       for (let j = 0; j < problemTypes.length; j++) {
//         const problemType = problemTypes[j];
//         const problemCount = monthData[problemType.key] || 0;
//         datasets[j].data.push(problemCount);
//       }
//     }

//     return {
//       labels,
//       datasets,
//     };

//   };

//   return (
//     <div>
//       <Bar data={getChartData()} />
//     </div>
//   );
// };

// export default BarChart;

//!  ค่ายเกม
const BarChart = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCases2()
      .then((res) => {
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getChartData = () => {
    const getMonthName = (month) => {
      return moment()
        .month(month - 1)
        .format("MMMM");
    };

    const problemsByMonth = value.reduce((acc, curr) => {
      const date = moment(curr.createdAt).locale("th");
      const month = date.month() + 1;
      const problem = curr.campgame;
      if (!acc[month]) {
        acc[month] = {};
      }
      if (!acc[month][problem]) {
        acc[month][problem] = 0;
      }
      acc[month][problem]++;
      return acc;
    }, {});

    const problemTypes = [
      "Sport",
      "SA ",
      "Sexy ",
      "DG",
      "Pretty ",
      "PG Slot",
      "SpiniX",
      "Evoplay",
      "Slot XO",
      "Live22",
      "Joker",
      "DragoonSoft",
      "Biogame & AMB",
      "BioFishing",
      "VwinLotto",
    ];

    const backgroundColor = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(255, 0, 255, 0.2)",
    ];

    const borderColor = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 0, 255, 1)",
    ];

    const labels = [];
    const datasets = problemTypes.map((problemType, index) => ({
      label: problemType,
      data: [],
      backgroundColor: backgroundColor[index % backgroundColor.length],
      borderColor: borderColor[index % borderColor.length],
      borderWidth: 1,
      //   barThickness: 15, // กำหนดขนาดแท่งกราฟที่ต้องการ
      barPercentage: 1, // กำหนดระยะห่างระหว่างแท่งกราฟ
      categoryPercentage: 1, // กำหนดระยะห่างระหว่างกลุ่มของแท่งกราฟ
    }));

    for (let i = 1; i <= 12; i++) {
      const monthData = problemsByMonth[i] || {};
      const monthLabel = getMonthName(i);
      labels.push(monthLabel);

      for (let j = 0; j < problemTypes.length; j++) {
        const problemType = problemTypes[j];
        const problemCount = monthData[problemType] || 0;
        datasets[j].data.push(problemCount);
      }
    }

    return {
      labels,
      datasets,
    };
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "เปรียบเทียบปริมาณค่ายเกมที่พบปัญหา (รายเดือน)",
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => value || "", // ให้แสดงค่าเป็นว่างถ้าไม่มีข้อมูล
      },
    },
    // อื่นๆตามต้องการ
  };
  return (
    <div>
      <Bar
        data={getChartData()}
        options={options}
        plugins={[ChartDataLabels]} // เพิ่มการใช้งาน plugin
      />
    </div>
  );
};

export default BarChart;
