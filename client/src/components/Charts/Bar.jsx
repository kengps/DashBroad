import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { SiMicrosoftexcel } from "react-icons/all";
import { listUser } from "../../api/user";

const Bars = () => {
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

  // Get data for Line Chart
  const getChartData = () => {
    const data = {
      labels: [],
      datasets: [
        {
          label: "User Registrations",
          data: [],
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
        {
          label: "Admin Registrations",
          data: [],
          fill: false,
          backgroundColor: "rgba(255,99,132,0.4)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
        },
        {
          label: "Member Registrations",
          data: [],
          fill: false,
          backgroundColor: "rgba(54, 162, 235, 0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    const dateArr = [];
    const countArr = [];
    const adminArr = [];
    const memberArr = [];

    // Calculate data for each role
    value.forEach((item) => {
      const itemDate = new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "long",
      });
      const index = dateArr.findIndex((date) => date === itemDate);
      if (index >= 0) {
        countArr[index]++;
        if (item.role === "admin") {
          adminArr[index]++;
        } else if (item.role === "member") {
          memberArr[index]++;
        }
      } else {
        dateArr.push(itemDate);
        countArr.push(1);
        adminArr.push(item.role === "admin" ? 1 : 0);
        memberArr.push(item.role === "member" ? 1 : 0);
      }
    });

    data.labels = dateArr;
    data.datasets[0].data = countArr;
    data.datasets[1].data = adminArr;
    data.datasets[2].data = memberArr;

    return data;
  };

  return (
    <div>
      <table id="line-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>User Count</th>
            <th>Admin Count</th>
          </tr>
        </thead>
        <tbody>
          {getChartData().labels.map((label, index) => (
            <tr key={index}>
              <td>{label}</td>
              <td>{getChartData().datasets[0].data[index]}</td>
              <td>{getChartData().datasets[1].data[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn-excel">
        <ReactHTMLTableToExcel
          className="btn btn-info"
          table="line-table"
          filename="line_chart"
          sheet="Sheet"
          buttonText={<SiMicrosoftexcel />}
        />
      </div>
      <Line data={getChartData()} />
    </div>
  );
};

export default Bars;
