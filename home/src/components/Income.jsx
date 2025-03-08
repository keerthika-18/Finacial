import { useEffect, useState } from "react";

const Income = () => {
    const [monthlyIncome, setMonthlyIncome] = useState([]);
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");

    // Fetch income data
    const fetchIncome = async () => {
        try {
            const res = await fetch("http://localhost:5000/income/monthly");
            if (res.ok) {
                const data = await res.json();
                setMonthlyIncome(data); // Update state with fetched data
            } else {
                console.error("Failed to fetch income data");
            }
        } catch (error) {
            console.error("Error fetching income:", error);
        }
    };

    useEffect(() => {
        fetchIncome();
    }, []);

    // Function to handle income submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newIncome = { source, amount: Number(amount), date: new Date() };

        try {
            const res = await fetch("http://localhost:5000/income", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIncome),
            });

            if (res.ok) {
                setSource(""); // Clear input
                setAmount("");
                fetchIncome(); // Re-fetch income data after adding new income
            }
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Monthly Income</h2>

            {/* Income Input Form */}
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="mb-2">
                    <label className="block font-bold">Income Source:</label>
                    <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-bold">Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Income
                </button>
            </form>

            {/* Display Monthly Income */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                {monthlyIncome.length === 0 ? (
                    <p className="text-gray-500">No income records available.</p>
                ) : (
                    monthlyIncome.map((income, index) => (
                        <div key={index} className="border-b py-2">
                            {income._id?.month}/{income._id?.year} - <strong>${income.totalIncome}</strong>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Income;
