// src/components/Dashboard.tsx
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import ScatterChart from "./ScatterChart";
import StackedBarChart from "./StackedBar";
import DoughNut from "./DoughNutChart";
import BubbleChart from "./BubbleChart";

export default function DashBoard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div className="bg-white rounded-2xl shadow-md p-4">
                <BarChart />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
                <PieChart />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
                <LineChart />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
                <StackedBarChart />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
                <ScatterChart />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
                <DoughNut />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
                <BubbleChart />
            </div>
        </div>
    );
}

