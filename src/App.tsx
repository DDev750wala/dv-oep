import { useContext, useEffect, useState } from "react";
import "./App.css";
// import { Button } from "./components/ui/button";
import Papa from "papaparse";
import csvData from "../assets/data.csv?raw";
import { DataContext, DataInterface } from "./lib/dataStore";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import ScatterChart from "./components/ScatterChart";
import StackedBarChart from "./components/StackedBar";
import DoughNut from "./components/DoughNutChart";
import BubbleChart from "./components/BubbleChart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashBoard from "./components/DashBoard";
import Navbar from "./components/Navbar";

function App() {
    const [data, setData] = useState<DataInterface[]>([]);
    const dataStore = useContext(DataContext);

    useEffect(() => {
        const parsed = Papa.parse<DataInterface>(csvData, {
            header: true,
            skipEmptyLines: true,
        });

        if (parsed.data.length > 0) {
            const extractedData = parsed.data;
            // console.log("HEllo World");

            // console.log(extractedData);

            setData(extractedData);
            dataStore.setData(extractedData);
        }
    }, []);

    return (
        <DataContext.Provider value={{ data, setData }}>
            <Router>
                {/* <BarChart />
                <PieChart />
                <LineChart />
                <StackedBarChart />
                <ScatterChart />
                <DoughNut />
                <BubbleChart />
                <DashBoard /> */}
                <Navbar />
                <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/bar-chart" element={<BarChart />} />
                    <Route path="/bubble-chart" element={<BubbleChart />} />
                    <Route path="/doughnut-chart" element={<DoughNut />} />
                    <Route path="/line-chart" element={<LineChart />} />
                    <Route
                        path="/stackedbar-chart"
                        element={<StackedBarChart />}
                    />
                    <Route path="/pie-chart" element={<PieChart />} />
                    <Route path="/scatter-chart" element={<ScatterChart />} />
                    <Route path="/dashboard" element={<DashBoard />} />
                </Routes>
            </Router>
        </DataContext.Provider>
    );
}

export default App;

// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Papa from "papaparse";
// import csvData from "../assets/data.csv?raw";

// import { DataContext, DataInterface } from "./lib/dataStore";

// // Components
// import Navbar from "./components/Navbar";
// import BarChart from "./components/BarChart";
// import PieChart from "./components/PieChart";
// import LineChart from "./components/LineChart";
// import ScatterChart from "./components/ScatterChart";
// import StackedBarChart from "./components/StackedBar";
// import DoughNut from "./components/DoughNutChart";
// import BubbleChart from "./components/BubbleChart";
// import DashBoard from "./components/DashBoard";

// function App() {
//     const [data, setData] = useState<DataInterface[]>([]);

//     useEffect(() => {
//         Papa.parse<DataInterface>(csvData, {
//             header: true,
//             skipEmptyLines: true,
//             complete: (results) => {
//                 if (results.data.length > 0) {
//                     setData(results.data);
//                 }
//             },
//         });
//     }, []);

//     return (
//         <DataContext.Provider value={{ data, setData }}>
//             <Router>
//                 <Navbar />
//                 <main className="p-6">
//                     <Routes>
//                         <Route path="/" element={<DashBoard />} />
//                         <Route path="/bar-chart" element={<BarChart />} />
//                         <Route path="/bubble-chart" element={<BubbleChart />} />
//                         <Route path="/doughnut-chart" element={<DoughNut />} />
//                         <Route path="/line-chart" element={<LineChart />} />
//                         <Route path="/stackedbar-chart" element={<StackedBarChart />} />
//                         <Route path="/pie-chart" element={<PieChart />} />
//                         <Route path="/scatter-chart" element={<ScatterChart />} />
//                         <Route path="/dashboard" element={<DashBoard />} />
//                     </Routes>
//                 </main>
//             </Router>
//         </DataContext.Provider>
//     );
// }

// export default App;
