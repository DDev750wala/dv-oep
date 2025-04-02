import React, { useContext } from "react";
import { DataContext } from "../lib/dataStore";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
    const data = useContext(DataContext).data;
    
    
    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Sample Bar Chart" },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Category", // Label for X-axis
            },
          },
          y: {
            title: {
              display: true,
              text: "Sales", // Label for Y-axis
            },
            beginAtZero: true,
          },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
