import { useEffect, useState, useContext } from "react";
import type { ChartData } from "chart.js";
import { DataContext } from "../lib/dataStore";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = () => {
    const [loading, setLoading] = useState(false);
    const [dataInFormat, setDataInFormat] =
        useState<ChartData<"line", (number | null)[], string>>();

    const data1 = useContext(DataContext).data;

    const parseDate = (dateStr: string): string | null => {
        const parts = dateStr.split("/");
        if (parts.length === 3) {
            const [day, month, year] = parts;
            const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
                2,
                "0"
            )}`;
            const dateObj = new Date(isoDate);
            return isNaN(dateObj.getTime()) ? null : isoDate;
        }
        return null;
    };

    useEffect(() => {
        setLoading(true);

        if (!data1 || data1.length === 0) {
            setLoading(false);
            return;
        }

        const groupedSales: Record<string, number> = {};

        data1.forEach((item) => {
            const parsedDate = parseDate(item.Order_Date);
            if (parsedDate) {
                groupedSales[parsedDate] =
                    (groupedSales[parsedDate] || 0) + Number(item.Sales);
            } else {
                console.warn("Invalid date skipped:", item.Order_Date);
            }
        });

        const labels = Object.keys(groupedSales).sort(
            (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );

        const salesData = labels.map((label) => groupedSales[label]);

        setDataInFormat({
            labels,
            datasets: [
                {
                    label: "Sales",
                    data: salesData,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    tension: 0.4, // smoother curve
                    fill: true,
                    pointRadius: 2,
                    pointHoverRadius: 5,
                    spanGaps: true,
                },
            ],
        });

        setLoading(false);
    }, [data1]);

    if (loading) return <div>Loading...</div>;

    return dataInFormat ? (
        <div className="w-full h-[70vh]">
            <Line
                data={dataInFormat}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: "top",
                            labels: {
                                font: { size: 12 },
                                color: "black",
                            },
                        },
                        title: {
                            display: true,
                            text: "Sales by Order Date (Line Chart)",
                            font: { size: 18, weight: "bold" },
                            color: "black",
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const value = context.formattedValue || "0";
                                    return `Sales: ${value}`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Order Date",
                                font: { weight: "bold" },
                                color: "black",
                            },
                            ticks: {
                                font: { size: 10, weight: "bold" },
                                maxRotation: 45,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Sales",
                                font: { weight: "bold" },
                                color: "black",
                            },
                            beginAtZero: true,
                            ticks: { font: { size: 10, weight: "bold" } },
                        },
                    },
                }}
            />
        </div>
    ) : (
        <div>No data available</div>
    );
};

export default LineChart;
