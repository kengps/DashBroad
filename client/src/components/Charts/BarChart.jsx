import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";
import { listUser } from "../../api/user";
import { listCases2 } from "../../api/case";
import moment from "moment";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
    const backgroundColor1 = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(255, 0, 255, 0.2)",
      "rgba(99, 165, 255, 0.2)",
      "rgba(101, 99, 255, 0.2)",
      "rgba(88, 214, 141, 0.2)",
      "rgba(229, 152, 102, 0.2)",
      "rgba(192, 57, 43, 0.2)",
      "rgba(231, 76, 60, 0.2)",
      "rgba(155, 89, 182, 0.2)",
      "rgba(22, 160, 133, 0.2)",
    ];

    const borderColor1 = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 0, 255, 1)",
      "rgba(99, 165, 255, 1)",
      "rgba(101, 99, 255, 1)",
      "rgba(88, 214, 141, 1)",
      "rgba(229, 152, 102, 1)",
      "rgba(192, 57, 43, 1)",
      "rgba(231, 76, 60, 1)",
      "rgba(155, 89, 182, 1)",
      "rgba(22, 160, 133, 1)",
    ];

    const problemTypes = [...new Set(value.map((item) => item.campgame))];

    // console.log("All Problem Types:", problemTypes);

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

    // console.log("Problems by Month:", problemsByMonth);

    const filteredProblemTypes = problemTypes.filter((problemType) => {
      if (problemType !== "" && problemType.trim() !== "") {
        for (let i = 1; i <= 12; i++) {
          const monthData = problemsByMonth[i] || {};
          if (monthData[problemType] && monthData[problemType] > 0) {
            return true;
          }
        }
      }
      return false;
    });

    // console.log("Filtered Problem Types:", filteredProblemTypes);

    const backgroundColor = backgroundColor1;

    const borderColor = borderColor1;

    const datasets = filteredProblemTypes.map((problemType, index) => {
      const background = backgroundColor[index % backgroundColor.length];
      const border = borderColor[index % borderColor.length];

      const data = [];
      for (let i = 1; i <= 12; i++) {
        const monthData = problemsByMonth[i] || {};
        const problemCount = monthData[problemType] || 0;
        data.push(problemCount);
      }

      return {
        label: problemType,
        data,
        backgroundColor: background,
        borderColor: border,
        hoverBackgroundColor: border,
        hoverBorderColor: "#666666",
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
      };
    });

    const options = {
      plugins: {
        title: {
          display: true,
          text: "เปรียบเทียบปริมาณค่ายเกมที่พบปัญหา (รายเดือน)",
        },
        datalabels: {
          anchor: "end",
          align: "end",
          formatter: (value) => value || "",
        },
      },
    };

    return {
      labels: [...Array(12)].map((_, index) =>
        moment().month(index).format("MMMM")
      ),
      datasets,
      options,
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
