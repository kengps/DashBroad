import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { SiMicrosoftexcel } from "react-icons/all";
import { listUser } from "../../api/user";
import { listCases2 } from "../../api/case";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import moment from "moment";

const Bars = () => {
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

  const getMonthName = (month) => {
    return moment()
      .month(month - 1)
      .format("MMMM");
  };

  const getChartData = () => {
    const colorBg = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(255, 0, 255, 0.2)",
    ];
    const colorBg2 = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 0, 255, 1)",
    ];

    const problemsByMonth = value.reduce((acc, curr) => {
      const date = moment(curr.createdAt).locale("th");
      const month = date.month() + 1;
      const problem = curr.problem;
      if (!acc[month]) {
        acc[month] = {};
      }
      if (!acc[month][problem]) {
        acc[month][problem] = 0;
      }
      acc[month][problem]++;
      return acc;
    }, {});

    const problemDetails = Array.from(
      new Set(value.map((item) => item.problem))
    );

    const labels = [];
    const datasets = [];

    problemDetails.forEach((problemDetail) => {
      if (!problemDetail) return;
      const dataValues = [];
      for (let i = 1; i <= 12; i++) {
        const monthData = problemsByMonth[i] || {};
        const value = monthData[problemDetail] || 0;
        dataValues.push(value);
      }

      const backgroundColor = colorBg.shift();
      const borderColor = colorBg2.shift();

      const dataset = {
        label: problemDetail,
        data: dataValues,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      };

      datasets.push(dataset);
    });

    for (let i = 1; i <= 12; i++) {
      const monthLabel = getMonthName(i);
      labels.push(monthLabel);
    }

    return {
      labels,
      datasets,
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "แนวโน้มปริมาณรายละเอียดปัญหา (รายเดือน)",
      },
    },
  };


  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Data");

    const sheetData = getChartData();
    const dataRows = sheetData.labels.map((label, index) => ({
      label,
      bioData: sheetData.datasets[0].data[index],
      lsmData: sheetData.datasets[1].data[index],
      apiData: sheetData.datasets[2].data[index],
      otherData: sheetData.datasets[3].data[index],
    }));

    // Add header row
    sheet.addRow([
      "Month",
      "หลังบ้าน bio",
      "กลุ่ม lsm-Pretty Gaming",
      "ขอ API",
      "เรื่องทั่วไป",
    ]);

    // Add data rows
    dataRows.forEach((row) => {
      sheet.addRow([
        row.label,
        row.bioData,
        row.lsmData,
        row.apiData,
        row.otherData,
      ]);
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const data = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(data, "แนวโน้มปริมาณปัญหา (รายวัน).xlsx");
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={exportToExcel} style={{backgroundColor: '#A9CCE3'}}>
          <SiMicrosoftexcel />
        </button>
      </div>

      <Line data={getChartData()} options={options} />
    </div>
  );
};

export default Bars;




//! old_version
// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import "chart.js/auto";
// import { SiMicrosoftexcel } from "react-icons/all";
// import { listUser } from "../../api/user";
// import { listCases2 } from "../../api/case";
// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// import moment from "moment";

// const Bars = () => {
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

//   const getMonthName = (month) => {
//     return moment()
//       .month(month - 1)
//       .format("MMMM");
//   };

//   const getChartData = () => {
//     const problemsByMonth = value.reduce((acc, curr) => {
//       const date = moment(curr.createdAt).locale("th");
//       const month = date.month() + 1;
//       const problem = curr.problem;
//       if (!acc[month]) {
//         acc[month] = {};
//       }
//       if (!acc[month][problem]) {
//         acc[month][problem] = 0;
//       }
//       acc[month][problem]++;
//       return acc;
//     }, {});

//     const labels = [];
//     const bioData = [];
//     const lsmData = [];
//     const apiData = [];
//     const otherData = [];
//     for (let i = 1; i <= 12; i++) {
//       const monthData = problemsByMonth[i] || {};
//       const bioCount = monthData["หลังบ้าน bio"] || 0;
//       const lsmCount = monthData["กลุ่ม lsm-Pretty Gaming"] || 0;
//       const apiCount = monthData["ขอ API"] || 0;
//       const otherCount = monthData["เรื่องทั่วไป"] || 0;
//       const monthLabel = getMonthName(i);
//       labels.push(monthLabel);
//       bioData.push(bioCount);
//       lsmData.push(lsmCount);
//       apiData.push(apiCount);
//       otherData.push(otherCount);
//     }

//     return {
//       labels,
//       datasets: [
//         {
//           label: "หลังบ้าน bio",
//           data: bioData,
//           backgroundColor: "rgba(75,192,192,0.4)",
//           borderColor: "rgba(75,192,192,1)",
//           borderWidth: 1,
//         },
//         {
//           label: "กลุ่ม lsm-Pretty Gamings",
//           data: lsmData,
//           backgroundColor: "rgba(255,99,132,0.4)",
//           borderColor: "rgba(255,99,132,1)",
//           borderWidth: 1,
//         },
//         {
//           label: "ขอ API",
//           data: apiData,
//           backgroundColor: "rgba(54, 162, 235, 0.4)",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//         },
//         {
//           label: "เรื่องทั่วไป",
//           data: otherData,
//           backgroundColor: "rgba(153, 102, 255, 0.4)",
//           borderColor: "rgba(153, 102, 255, 1)",
//           borderWidth: 1,
//         },
//       ],
//     };
//   };
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "right",
//       },
//       title: {
//         display: true,
//         text: "แนวโน้มปริมาณปัญหา (รายเดือน)",
//       },
//     },
//   };

//   const exportToExcel = () => {
//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet("Data");

//     const sheetData = getChartData();
//     const dataRows = sheetData.labels.map((label, index) => ({
//       label,
//       bioData: sheetData.datasets[0].data[index],
//       lsmData: sheetData.datasets[1].data[index],
//       apiData: sheetData.datasets[2].data[index],
//       otherData: sheetData.datasets[3].data[index],
//     }));

//     // Add header row
//     sheet.addRow([
//       "Month",
//       "หลังบ้าน bio",
//       "กลุ่ม lsm-Pretty Gaming",
//       "ขอ API",
//       "เรื่องทั่วไป",
//     ]);

//     // Add data rows
//     dataRows.forEach((row) => {
//       sheet.addRow([
//         row.label,
//         row.bioData,
//         row.lsmData,
//         row.apiData,
//         row.otherData,
//       ]);
//     });

//     // Generate Excel file
//     workbook.xlsx.writeBuffer().then((buffer) => {
//       const data = new Blob([buffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       saveAs(data, "chart_data.xlsx");
//     });
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <button onClick={exportToExcel} style={{backgroundColor: '#A9CCE3'}}>
//           <SiMicrosoftexcel />
//         </button>
//       </div>

//       <Line data={getChartData()} options={options} />
//     </div>
//   );
// };

// export default Bars;