import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const MonthChart = () => {
  const divStyle = {
    width: "500px",
  };

  const [line_data, setLineData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4042/api/feedback/report/month", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((datas) => {
        if (!datas.error) {
          const idList = datas.map((item) => item._id);
          const valueList = datas.map((item) => item.count);
          const x = {
            labels: idList,
            datasets: [
              {
                label: "Review Count",
                data: valueList,
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
              },
            ],
          };
          setLineData(x);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={divStyle}>
      {line_data && <Line data={line_data} options={options} />}
    </div>
  );
};
export default MonthChart;
