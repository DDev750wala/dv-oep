import { createContext } from "react";

export interface DataInterface {
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

export const DataContext = createContext<{
    data: DataInterface[];
    setData: React.Dispatch<React.SetStateAction<DataInterface[]>>;
}>({
    data: [],
    setData: () => {},
});
