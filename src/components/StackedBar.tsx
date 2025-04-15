import { useContext, useEffect, useState } from "react";
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
    ChartData,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StackedBarChart = () => {
    const rawData = useContext(DataContext).data;
    const [chartData, setChartData] = useState<ChartData<"bar">>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!rawData || rawData.length === 0) {
            setLoading(false);
            return;
        }

        // Group unique Categories and Regions
        const categories = Array.from(new Set(rawData.map((d) => d.Category)));
        const regions = Array.from(new Set(rawData.map((d) => d.Region)));

        // Build region-wise datasets
        const datasets = regions.map((region) => {
            const data = categories.map((category) => {
                const total = rawData
                    .filter(
                        (d) => d.Category === category && d.Region === region
                    )
                    .reduce((sum, d) => sum + Number(d.Sales), 0);
                return total;
            });

            return {
                label: region,
                data,
                backgroundColor: getColor(region),
            };
        });

        setChartData({
            labels: categories,
            datasets,
        });

        setLoading(false);
    }, [rawData]);

    if (loading) return <div>Loading...</div>;

    return chartData ? (
        <div className="w-full h-[80vh]">
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Category-wise Sales in Different Regions",
                            font: { size: 18, weight: "bold" },
                            color: "black",
                        },
                        legend: {
                            position: "bottom",
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) =>
                                    `${context.dataset.label}: ₹${context.formattedValue}`,
                            },
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                            title: {
                                display: true,
                                text: "Category",
                                font: {
                                    weight: "bold",
                                    size: 13,
                                },
                                color: "black",
                            },
                            ticks: {
                                font: {
                                    size: 10,
                                    weight: "bold",
                                },
                            },
                        },
                        y: {
                            stacked: true,
                            title: {
                                display: true,
                                text: "Sales",
                                font: {
                                    weight: "bold",
                                    size: 13,
                                },
                                color: "black",
                            },
                            ticks: {
                                font: {
                                    size: 10,
                                    weight: "bold",
                                },
                            },
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    ) : (
        <div>No data available</div>
    );
};

// Optional: Region-based color mapping
const getColor = (region: string) => {
    const colors: Record<string, string> = {
        East: "rgba(255, 99, 132, 0.7)",
        West: "rgba(54, 162, 235, 0.7)",
        South: "rgba(255, 206, 86, 0.7)",
        North: "rgba(75, 192, 192, 0.7)",
    };
    return colors[region] || "rgba(153, 102, 255, 0.7)";
};

export default StackedBarChart;
