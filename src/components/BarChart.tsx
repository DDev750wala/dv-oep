import { useContext, useEffect, useState } from "react";
import { DataContext, DataInterface } from "../lib/dataStore";
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
import { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
    const [loading, setLoading] = useState(false);
    const [dataInFormat, setDataInFormat] =
        useState<
            ChartData<"bar", (number | [number, number] | null)[], unknown>
        >();

    const [data, setData] = useState<DataInterface[] | null>(null);

    const data1 = useContext(DataContext).data;

    useEffect(() => {
        setLoading(true);

        setData(data1);

        if (data === null) {
            return;
        }

        const groupBy = (arr: DataInterface[], key: keyof DataInterface) => {
            return arr.reduce((acc: Record<string, DataInterface[]>, obj) => {
                const value = obj[key];
                acc[value] = acc[value] || [];
                acc[value].push(obj);
                return acc;
            }, {} as Record<string, DataInterface[]>);
        };

        const groupedData = groupBy(data, "Category");

        let labels: string[] = [];

        console.log("IN BAR CHART");
        for (const key in groupedData) {
            console.log(groupedData[key]);
            labels.push(key);
        }

        let totalSalesByCategory: number[] = [];

        for (const key in groupedData) {
            const sales = groupedData[key].reduce(
                (acc, obj) => acc + Number(obj.Sales),
                0
            );
            totalSalesByCategory.push(sales);
        }

        let datasets: any = [
            {
                label: "Category",
                data: totalSalesByCategory,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ];

        setDataInFormat({
            labels: labels,
            datasets: datasets,
        });

        setLoading(false);
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (!data || data.length === 0) return <p>Loading chart data...</p>;

    return data ? (
        <div className="w-full h-[70vh]">
            <Bar
                data={
                    dataInFormat as ChartData<
                        "bar",
                        (number | [number, number] | null)[],
                        unknown
                    >
                }
                options={{
                    responsive: true,
                    color: "orange",
                    maintainAspectRatio: false,
                    layout: {
                        padding: 0,
                    },
                    plugins: {
                        colors: {
                            enabled: true,
                            forceOverride: true,
                        },
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Bar Chart",
                            align: "center",
                            color: "black",
                            font: { size: 20, weight: "bold" },
                        },
                        tooltip: {
                            titleFont: { size: 8 },
                            bodyFont: { size: 8 },
                            padding: 5,
                            caretSize: 4,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Category",
                                align: "center",
                                font: { weight: "bold" },
                                color: "black",
                            },
                            ticks: {
                                font: { size: 10, weight: "bold" },
                                autoSkip: false,

                                align: "center",
                            },
                            grid: {
                                offset: true,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Sales",
                                font: { weight: "bold" },
                                color: "black",
                            },
                            beginAtZero: false,
                            ticks: {
                                stepSize: 50000,
                                font: { size: 10, weight: "bold" },
                            },
                        },
                    },
                }}
            />
        </div>
    ) : (
        <div>No data available</div>
    );
};

export default BarChart;
