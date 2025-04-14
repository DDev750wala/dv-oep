import { useContext, useEffect, useState } from "react";
import "./App.css";
// import { Button } from "./components/ui/button";
import Papa from "papaparse";
import csvData from "../assets/data.csv?raw";
import { DataContext, DataInterface } from "./lib/dataStore";
// import BarChart from "./components/BarChart";
// import PieChart from "./components/PieChart";
// import LineChart from "./components/LineChart";
// import  ScatterChart  from "./components/ScatterChart";
// import StackedBarChart from "./components/StackedBar";
// import DoughNut from "./components/DoughNutChart";
// import BubbleChart from "./components/BubbleChart";

import DashBoard from "./components/DashBoard";

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
            <>
                {/* <h1 className="text-5xl font-extrabold">Sagrampura</h1>
                <Button className="" variant={"default"}>
                    click 
                </Button> */}
                {/* <BarChart /> */}
                {/* <PieChart /> */}
                {/* <LineChart /> */}
                {/* <StackedBarChart />  */}
                {/* <ScatterChart /> */}
                {/* <DoughNut /> */}
                {/* <BubbleChart /> */}
                <DashBoard />
            </>
        </DataContext.Provider>
    );
}

export default App;
