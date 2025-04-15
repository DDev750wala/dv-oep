import { useContext, useEffect, useState } from "react";
import { DataContext } from "../lib/dataStore";
import { Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    ChartData,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);
import "chartjs-adapter-date-fns";

const ScatterChart = () => {
    const [loading, setLoading] = useState(true);
    const [dataInFormat, setDataInFormat] =
        useState<ChartData<"scatter", { x: number; y: number }[], unknown>>();

    const data = useContext(DataContext).data;

    useEffect(() => {
        if (!data || data.length === 0) {
            setLoading(false);
            return;
        }

        const parsedData = data.map((item) => {
            const date = new Date(item.Ship_Date).getTime(); // converts to timestamp
            const sales = Number(item.Sales);
            return { x: date, y: sales };
        });

        setDataInFormat({
            labels: [],
            datasets: [
                {
                    label: "Sales over Time",
                    data: parsedData,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                },
            ],
        });

        setLoading(false);
    }, [data]);

    if (loading) return <div>Loading...</div>;

    if (
        !dataInFormat ||
        !dataInFormat.datasets ||
        dataInFormat.datasets.length === 0
    ) {
        return <div>No data available</div>;
    }

    return (
        <div className="w-full h-[70vh]">
            <Scatter
                data={dataInFormat}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Sales vs Ship Date",
                            font: { size: 20, weight: "bold" },
                            color: "black",
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const date = new Date(
                                        context.parsed.x
                                    ).toLocaleDateString();
                                    return `Date: ${date}, Sales: ${context.parsed.y}`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "month",
                            },
                            title: {
                                display: true,
                                text: "Ship Date",
                                color: "black",
                                font: { weight: "bold" },
                            },
                            ticks: {
                                font: { size: 10, weight: "bold" },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Sales",
                                color: "black",
                                font: { weight: "bold" },
                            },
                            beginAtZero: false,
                            ticks: {
                                font: { size: 10, weight: "bold" },
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default ScatterChart;
