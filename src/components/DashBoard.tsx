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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4">
            <div className="bg-white rounded-xs shadow-md p-4 border-2">
                <BarChart />
            </div>
            <div className="bg-white rounded-xs shadow-md p-4 border-2">
                <PieChart />
            </div>
            <div className="bg-white rounded-xs shadow-md p-4 border-2">
                <LineChart />
            </div>
            <div className="bg-white rounded-xs shadow-md p-4 border-2">
                <StackedBarChart />
            </div>
            <div className="bg-white rounded-xs shadow-md p-4 border-2">
                <ScatterChart />
            </div>
            <div className="bg-white rounded-xs shadow-md p-4 border-2">
                <DoughNut />
            </div>
            <div className="bg-white rounded-xs shadow-md p-4 border-2">
                <BubbleChart />
            </div>
        </div>
    );
}

