"use client";

import { useContext, useState } from "react";
import { DataContext } from "@/lib/dataStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DataInterface } from "../lib/dataStore";

export default function DatasetTable() {
    const { data } = useContext(DataContext);
    const [page, setPage] = useState(1);
    const rowsPerPage = 50;

    const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);
    const paginatedData = data?.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    return (
        <Card className="mt-10 shadow-md">
            <CardContent className="p-0">
                {/* Table with horizontal scrolling */}
                <div
                    className="relative overflow-x-auto"
                    style={{ maxHeight: "70vh" }}
                >
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 bg-background z-10">
                            <tr>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Row ID
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Order ID
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Order Date
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Ship Date
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Ship Mode
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Customer ID
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Customer Name
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Segment
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Country
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    City
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    State
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Postal Code
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Region
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Product ID
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Category
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Sub-Category
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Product Name
                                </th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">
                                    Sales
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData?.map((row: DataInterface, index) => (
                                <tr
                                    key={index}
                                    className={
                                        index % 2 === 0 ? "bg-muted/50" : ""
                                    }
                                >
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Row_ID}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Order_ID}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Order_Date}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Ship_Date}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Ship_Mode}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Customer_ID}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Customer_Name}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Segment}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Country}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.City}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.State}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Postal_Code}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Region}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Product_ID}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Category}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Sub_Category}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        {row.Product_Name}
                                    </td>
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        ${row.Sales}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center p-4 border-t">
                    <Button
                        variant="outline"
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Prev
                    </Button>
                    <span className="text-sm">
                        Page {page} of {totalPages || 1}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() =>
                            setPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={page === totalPages || totalPages === 0}
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
