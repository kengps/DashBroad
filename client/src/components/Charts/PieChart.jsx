import React, { useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";


import DataLoader from "../../contexts/DataLoader";
import ChartDataLabels from "chartjs-plugin-datalabels";

const PieChart = () => {
  const [PieKeys, setPieKeys] = useState([]);
  const [PieValue, setPieValue] = useState([]);



 
  const renderChart = (value) => {
    const groupedData = value.reduce((acc, cur) => {
      acc[cur.problem] = acc[cur.problem] ? acc[cur.problem] + 1 : 1;
      return acc;
    }, {});

    console.log("Pie ได้ชื่อมาหรือไม่", groupedData);
    const PieKeys = Object.keys(groupedData);
    const PieValue = Object.values(groupedData);

    
    // console.log("PieKeys", PieKeys);
    // console.log("", PieValue);

//  setPieKeys(PieKeys);
//     setPieValue(PieValue);
   
    //   let sumTotal = valueArr2.reduce(function (prev, curr) {
    //     return prev + curr;
    // }, 0);
   
    const options = {
      plugins: {
        title: {
          display: true,
          text: "ประเภทของปัญหาทั้งหมด",
        },
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += data;
            });
            let percentage = ((value * 100) / sum).toFixed(2) + "%";
            return `${percentage} (${value})`;
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
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 227, 1)",

            "rgba(99, 165, 255, 1)",
            "rgba(101, 99, 255, 1)",
            "rgba(88, 214, 141 , 1)",
            "rgba(229, 152, 102, 1)",
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
            "rgba(99, 165, 255, 0.2)",
            "rgba(101, 99, 255, 0.2)",
            "rgba(88, 214, 141 , 0.2)",
            "rgba(229, 152, 102, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 255, 1)",

            "rgba(99, 165, 255, 1)",
            "rgba(101, 99, 255, 1)",
            "rgba(88, 214, 141 , 1)",
            "rgba(229, 152, 102, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return <Pie data={data} options={options} plugins={[ChartDataLabels]} />;
  };
  

  return (
    <div>
      <table id="pie-table">
        <thead>
          <tr>
            <th>ประเภท</th>
            <th>จำนวน</th>
          </tr>
        </thead>
        <tbody>
          {/* {groupedData.map((label, index) => (
            <tr key={index}>
              <td>{label}</td>
              <td>{valueArr2[index]}</td>
            </tr>
          ))}
          <tr>
            <td><strong>รวมทั้งหมด</strong></td>
            <td><strong>{sumTotal}</strong></td>
          </tr> */}
        </tbody>
      </table>
      {/* <div className="btn-excel">
        <ReactHTMLTableToExcel
          className="btn btn-info"
          table="pie-table"
          filename="pie_chart"
          sheet="Sheet"
          buttonText={<SiMicrosoftexcel />}
        />
      </div> */}
      <DataLoader children={renderChart} />
    </div>
  );
};

export default PieChart;
