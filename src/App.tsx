import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Papa from "papaparse";
import csvData from "../assets/data.csv?raw";

interface DataInterface {
    Row_ID: number;
    Order_ID: string;
    Order_Date: string;
    Ship_Date: string;
    Ship_Mode: "Second Class" | "Standard Class" | "First Class" | "Same Day";
    Customer_ID: string;
    Customer_Name: string;
    Segment: "Consumer" | "Corporate" | "Home Office";
    Country: "United States";
    City: string;
    State: string;
    Postal_Code: number;
    Region: string;
    Product_ID: string;
    Category: string;
    Sub_Category: string;
    Product_Name: string;
    Sales: number;
}

function App() {
    const parsed = Papa.parse(csvData, { header: true }) as Papa.ParseResult<{
        data: Array<DataInterface>;
        errors: Array<unknown>;
        meta: {
            delimiter: string;
            linebreak: string;
            aborted: boolean;
            fields: Array<string>;
        };
    }>;
    console.log(parsed);
    console.log(parsed.data[0]);
    

    return (
        <>
            <h1 className="text-5xl font-extrabold">Sagrampura</h1>
            <Button className="" variant={"default"}>
                click to propose sagrampura
            </Button>
        </>
    );
}

export default App;
