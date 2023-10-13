import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RateChart = () => {
    const chartRef = useRef(null);
    const myChart = useRef(null);
    const divStyle = {
        width: '500px',
    };
    useEffect(() => {
        fetch("http://localhost:4042/api/feedback/report/rate", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.error) {
                    let maxRate = 0;
                    const rating = data.reduce((acc, obj) => {
                        const key = Object.keys(obj)[0];
                        const value = obj[key];
                        if (value > maxRate) {
                            maxRate = value;
                        }
                        acc[key] = value;
                        return acc;
                    }, {});
                    const ctx = chartRef.current.getContext('2d');
                    if (myChart.current) {
                        myChart.current.destroy();
                    }
                    myChart.current = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ["EXCELLENT", "VERY GOOD", "GOOD", "AVARAGE", "POOR"],
                            datasets: [
                                {
                                    label: 'Count',
                                    data: [rating["EXCELLENT"] ?? 0, rating["VERY GOOD"] ?? 0, rating["GOOD"] ?? 0, rating["AVARAGE"] ?? 0, rating["POOR"] ?? 0],
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: maxRate + 1
                                },
                            },
                        },
                    });
                }
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }, []);

    return (
        <div style={divStyle}>
            <canvas ref={chartRef} width="400" height="200" />
        </div>
    );
};

export default RateChart;
