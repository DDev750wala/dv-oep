import React, { useContext, useEffect, useState } from "react";
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
    CoreChartOptions,
    ElementChartOptions,
    ScaleChartOptions,
    DatasetChartOptions,
    PluginChartOptions,
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
            console.log(arr);

            return arr.reduce((acc: Record<string, DataInterface[]>, obj) => {
                const value = obj[key];
                acc[value] = acc[value] || [];
                acc[value].push(obj);
                return acc;
            }, {} as Record<string, DataInterface[]>);
        };

        const groupedData = groupBy(data, "Category");
        console.log(groupedData);

        let labels: string[] = [];

        for (const key in groupedData) {
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
        console.log(totalSalesByCategory);

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

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow flexible sizing
        layout: {
            padding: 20, // Add some space around the chart
        },
        plugins: {
            // Legend: false,
            // legend: { position: "top" as const },
            title: { display: true, text: "Bar Chart" },
        },
        scales: {
            x: {
                title: { display: true, text: "Category" },
                ticks: {
                    autoSkip: false,
                    maxRotation: 40,
                    minRotation: 30,
                    align: "center",
                },
            },
            y: {
                title: { display: true, text: "Sales" },
                beginAtZero: false,
                ticks: {
                    stepSize: 50000,
                },
            },
        },
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // Wrap chart inside a responsive div
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
                            font: { size: 20 },
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
                            title: { display: true, text: "Category", align: "center" },
                            ticks: {
                                font: { size: 10 },
                                autoSkip: false,
                                maxRotation: 30,
                                minRotation: 40,
                                align: "center",
                            },
                            grid: {
                                offset: true,
                            },
                        },
                        y: {
                            title: { display: true, text: "Sales" },
                            beginAtZero: false,
                            ticks: {
                                stepSize: 50000,
                                font: { size: 10 },
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
