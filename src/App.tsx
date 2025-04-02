import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Papa from "papaparse";
import csvData from "../assets/data.csv?raw";
import { DataContext, DataInterface } from "./lib/dataStore";

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
            console.log(extractedData);
            
            setData(extractedData);
            dataStore.setData(extractedData);
        }
    }, []);

    return (
        <DataContext.Provider value={{ data, setData }}>
            <>
                <h1 className="text-5xl font-extrabold">Sagrampura</h1>
                <Button className="" variant={"default"}>
                    click to propose sagrampura
                </Button>
            </>
        </DataContext.Provider>
    );
}

export default App;
