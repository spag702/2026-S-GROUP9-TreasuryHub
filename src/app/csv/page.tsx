"use client";

import { useState } from "react";
import { exportCSV } from "./action";

export default function CSVPage( ) {
    const [error, setError] = useState<string | null>(null);
    
    const handleExport = async () => {
        setError(null);
        const result = await exportCSV();

        if ('error' in result) {
            setError(result.error ?? "An error occurred during export.");
            return;
    }

    const data = result.data;
    if (!data || data.length === 0) {
        setError("No transactions found to export.");
        return;
    }

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
};

    return (
        <div>
            <h1>Exporting Transactions into CSV File</h1>
            {error && <p className="text-red-500">{error}</p>}
            <button onClick={() => handleExport()}
                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:scale-95 transition-all">
                Export Transactions
            </button>
        </div>
    );
}