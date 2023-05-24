import React, { useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DataLoader from "../../contexts/DataLoader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";
import ChartDataLabels from "chartjs-plugin-datalabels";
const BarHorizontal = () => {
  const renderChart = (value) => {
    const groupedData = value.reduce((acc, cur) => {
      acc[cur.recorder] = acc[cur.recorder] ? acc[cur.recorder] + 1 : 1;
      return acc;
    }, {});

    const labelArr1 = Object.keys(groupedData);
    const selectedData = groupedData[labelArr1[0]]; // เลือกข้อมูลตัวที่ 3
    const selectedValue = labelArr1[2];
  


    const options = {
      indexAxis: "y",
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "จำนวนผู้ลงเคสทั้งหมด",
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
            "rgba(255, 0, 255, 1)",
          ],
          hoverBorderColor: "#666666",

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

    return <Bar data={data} options={options} plugins={[ChartDataLabels]} />;
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
          {/* {labelArr2.map((label, index) => (
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
      <div className="btn-excel">
        <ReactHTMLTableToExcel
          className="btn btn-info"
          table="pie-table"
          filename="pie_chart"
          sheet="Sheet"
          buttonText={<SiMicrosoftexcel />}
        />
      </div>
      <DataLoader children={renderChart} />
    </div>
  );
};

export default BarHorizontal;
