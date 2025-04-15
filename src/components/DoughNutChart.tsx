import { useEffect, useState, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
} from "chart.js";
import { DataContext, DataInterface } from "../lib/dataStore";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughNut = () => {
    const [loading, setLoading] = useState(false);
    const [dataInFormat, setDataInFormat] =
        useState<ChartData<"doughnut", number[], unknown>>();

    const [data, setData] = useState<DataInterface[] | null>(null);

    const data1 = useContext(DataContext).data;

    useEffect(() => {
        setLoading(true);
        setData(data1);

        if (data1 === null) {
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

        const groupedData = groupBy(data1, "Region");

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

        const backgroundColors = [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
        ];

        let datasets: any = [
            {
                label: "Sales distribution By Region",
                data: totalSalesByCategory,
                backgroundColor: backgroundColors.slice(0, labels.length),
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
        <div className="w-full h-[70vh] p-4">
            <Doughnut
                data={dataInFormat as ChartData<"doughnut", number[], unknown>}
                options={{
                    responsive: true,

                    maintainAspectRatio: false,
                    layout: {
                        padding: 0,
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: "right",
                            labels: {
                                color: "black",
                                font: { size: 12 },
                                boxWidth: 20,
                                padding: 10,
                            },
                        },
                        title: {
                            display: true,
                            text: "Sales by Region(Doughnut Chart)",
                            align: "center",
                            color: "black",
                            font: {
                                size: 20,
                                weight: "bold",
                            },
                            padding: {
                                top: 10,
                            },
                        },
                        tooltip: {
                            titleFont: { size: 10 },
                            bodyFont: { size: 10 },
                            padding: 6,
                            caretSize: 5,
                        },
                    },
                }}
            />
        </div>
    ) : (
        <div>No data available</div>
    );
};

export default DoughNut;
