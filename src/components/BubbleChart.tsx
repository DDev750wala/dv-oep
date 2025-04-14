import { useState, useContext, useEffect } from "react";
import { Bubble } from "react-chartjs-2";
import { DataContext } from "../lib/dataStore";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const BubbleChart = () => {
    const [loading, setLoading] = useState(true);
    const [dataInFormat, setDataInFormat] =
        useState<
            ChartData<
                "bubble",
                { x: number | Date; y: number; r: number }[],
                unknown
            >
        >();
    const data = useContext(DataContext).data;

    useEffect(() => {
        if (!data || data.length === 0) {
            setLoading(false);
            return;
        }

        const parsedData = data.map((item) => {
            const date = new Date(item.Order_Date).getTime();
            const sales = Number(item.Sales);
            const radius = Math.sqrt(sales) / 8; // scale radius based on sales
            return { x: date, y: sales, r: radius };
        });

        setDataInFormat({
            labels: [], // <-- Add this line to avoid runtime error
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
    
    if (!data || data.length === 0) return <p>Loading chart data...</p>;

    return (
        <div className="w-full h-[70vh]">
            <Bubble
                data={
                    dataInFormat as ChartData<
                        "bubble",
                        { x: number | Date; y: number; r: number }[],
                        unknown
                    >
                }
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Bubble Chart - Sales Over Time",
                            font: { size: 18 },
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const { x, y, r } = context.raw as {
                                        x: number | Date;
                                        y: number;
                                        r: number;
                                    };

                                    const formattedDate =
                                        typeof x === "number"
                                            ? new Date(x).toLocaleDateString()
                                            : x.toLocaleDateString();

                                    return `Date: ${formattedDate}, Sales: $${y.toFixed(
                                        2
                                    )}, Size: ${r.toFixed(2)}`;
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
                                text: "Order Date",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Sales",
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default BubbleChart;
