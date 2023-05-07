import React, { useContext, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import DataLoader from "../../contexts/DataLoader";



const PieChart = () => {
    const renderChart = (value) => {
        const userCount = value.filter((item) => item.role === "user").length;
        const adminCount = value.filter((item) => item.role === "admin").length;
        const userEnabledCount = value.filter((item) => item.enabled === true).length;
        const userDisabledCount = value.filter((item) => item.enabled === false).length;
    
        const options = {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function (
                    previousValue,
                    currentValue,
                    currentIndex,
                    array
                  ) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var percentage = parseFloat(
                    ((currentValue / total) * 100).toFixed(1)
                  );
                  return percentage + "%";
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Monthly Sales",
              },
            },
          };


        const data = {
          labels: ["Users", "Admins", "Active Users", "Disabled Users"],
          datasets: [
            {
              label: "# of Votes",
              data: [userCount, adminCount, userEnabledCount, userDisabledCount],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };
    
        return <Pie data={data} options={options}/>;
      };
    
      return (
        <div>
          <DataLoader children={renderChart} />
        </div>
      );
    };

export default PieChart;
