import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";
import { listUser } from "../../api/user";

const Doughnuts = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listUser()
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
  const data = {
    labels: ["Users", "Admins", "Userที่ Active", "Userที่โดนปิด"],
    datasets: [
      {
        label: "# of Votes",
        data: [userCount, adminCount, UserEnabled, UserEnabled1],
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
  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
          return percentage + "%";
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
      <Doughnut data={data} options={options}/>
    </div>
  );
};

export default Doughnuts;
