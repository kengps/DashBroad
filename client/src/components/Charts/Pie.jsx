import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";
const Pies = () => {
  const data1 = {
    ผู้ใช่งาน: 9,
    ผู้ใช่งาน2: 19,
    ผู้ใช่งาน3: 29,
    ผู้ใช่งาน4: 39,
  };
  const labelArr1 = Object.keys(data1);
  const valueArr1 = Object.values(data1);

  const data = {
    labels: labelArr1,
    datasets: [
      {
        label: "# of Votes",
        data: valueArr1,
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
      <Pie data={data} />
    </div>
  );
};

export default Pies;
