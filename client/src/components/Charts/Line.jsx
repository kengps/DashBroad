import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";
import { listUser } from "../../api/user";
import { listCases2 } from "../../api/case";
import moment from "moment";

const Lines = () => {
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
    const problemsByDate = value.reduce((acc, curr) => {
      const date = moment(curr.createdAt).locale('th').format('YYYY-MM-DD');
      const problem = curr.problem;
      if (!acc[date]) {
        acc[date] = {};
      }
      if (!acc[date][problem]) {
        acc[date][problem] = 0;
      }
      acc[date][problem]++;
      return acc;
    }, {});
  
    const labels = [];
    const bioData = [];
    const lsmData = [];
    const apiData = [];
    const otherData = [];
    const currentDate = moment().locale('th').startOf('month');
    for (let i = 0; i < 30; i++) {
      const date = currentDate.clone().add(i, 'days').format('YYYY-MM-DD');
      const dateData = problemsByDate[date] || {};
      const bioCount = dateData["หลังบ้าน bio"] || 0;
      const lsmCount = dateData["กลุ่ม lsm-Pretty Gaming"] || 0;
      const apiCount = dateData["ขอ API"] || 0;
      const otherCount = dateData["เรื่องทั่วไป"] || 0;
      const dateLabel = currentDate.clone().add(i, 'days').format("D MMMM");
      labels.push(dateLabel);
      bioData.push(bioCount);
      lsmData.push(lsmCount);
      apiData.push(apiCount);
      otherData.push(otherCount);
    }
  

    return {
      labels,
      datasets: [
        {
          label: "หลังบ้าน bio",
          data: bioData,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
        {
          label: "กลุ่ม lsm-Pretty Gamings",
          data: lsmData,
          backgroundColor: "rgba(255,99,132,0.4)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
        },
        {
          label: "ขอ API",
          data: apiData,
          backgroundColor: "rgba(54, 162, 235, 0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "เรื่องทั่วไป",
          data: otherData,
          backgroundColor: "rgba(153, 102, 255, 0.4)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div>
      <Line data={getChartData()} />
    </div>
  );
};

export default Lines;

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

//   const getChartData = () => {
//     // reduce array of cases to an object of problems by month
//     const problemsByMonth = value.reduce((acc, curr) => {
//       const date = new Date(curr.createdAt);
//       const month = date.getMonth() + 1;
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

//     // generate labels and data for each problem category
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
//       labels.push(`${i}`);
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

//   return (
//     <div>
//       <Line data={getChartData()} />
//     </div>
//   );
// };

// export default Bars;
