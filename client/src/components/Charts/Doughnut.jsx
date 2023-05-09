import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { listCases2 } from "../../api/case";

const Doughnuts = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCases2()
      .then((res) => {
        console.log(res);
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data1 = {
    ผู้ใช่งาน: 9,
    ผู้ใช่งาน2: 19,
    ผู้ใช่งาน3: 29,
    ผู้ใช่งาน4: 39,
  };
  const labelArr1 = Object.keys(data1);
  const valueArr1 = Object.values(data1);

  const userCount = value.filter((item) => item.role === "user").length;
  const adminCount = value.filter((item) => item.role === "admin").length;
  const UserEnabled = value.filter((item) => item.enabled === true).length;
  const UserEnabled1 = value.filter((item) => item.enabled === false).length;
  console.log(UserEnabled);

  const groupedData = value.reduce((acc, cur) => {
    // ตรวจสอบว่ามีข้อมูลหรือไม่  problemDetail ที่เป็นค่าว่างจะไม่นำมาใช้
    if (cur.problemDetail)
      acc[cur.problemDetail] = acc[cur.problemDetail]
        ? acc[cur.problemDetail] + 1
        : 1;
    return acc;
  }, {});
  //
  console.log("problemDetail", groupedData);

  //กำหนดสี
  const colorBg = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 0, 255, 1)",
  ];
  const colorBg2 = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 0, 255, 0.2)",
  ];
  const data = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "# จำนวน",
        data: Object.values(groupedData),
        backgroundColor: colorBg2,
        borderColor: colorBg,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "รายละเอียด",
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
        color: colorBg,
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
  console.log(options);
  return (
    <div>
      <table id="pie-table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {labelArr1.map((label, index) => (
            <tr key={index}>
              <td>{label}</td>
              <td>{valueArr1[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn-excel">
        <ReactHTMLTableToExcel
          className="btn btn-info"
          table="pie-table"
          filename="pie_chart"
          sheet="Sheet"
          buttonText={<SiMicrosoftexcel />}
        />
      </div>
      <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default Doughnuts;
