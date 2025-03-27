import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Papa from "papaparse";
import csvData from "../assets/data.csv?raw";

function App() {
    const parsed = Papa.parse(csvData, { header: true });
    console.log(parsed);
    

    return (
        <>
            <h1 className="text-5xl font-extrabold">Sagrampura</h1>
            <Button className="text-black" variant={"default"}>
                click to propose sagrampura
            </Button>
        </>
    );
}

export default App;
