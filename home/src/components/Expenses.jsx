import { useEffect, useState } from "react";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");

    // Fetch expenses from the backend
    const fetchExpenses = async () => {
        try {
            const res = await fetch("http://localhost:5000/expenses");
            if (res.ok) {
                const data = await res.json();
                setExpenses(data);
            } else {
                console.error("Failed to fetch expenses");
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Handle new expense submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newExpense = { category, amount: Number(amount), date: new Date() };

        try {
            const res = await fetch("http://localhost:5000/expenses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExpense),
            });

            if (res.ok) {
                setCategory(""); // Clear input
                setAmount("");
                fetchExpenses(); // Re-fetch expenses after adding new one
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Expenses</h2>

            {/* Expense Input Form */}
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="mb-2">
                    <label className="block font-bold">Expense Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                    Add Expense
                </button>
            </form>

            {/* Display Expenses */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                {expenses.length === 0 ? (
                    <p className="text-gray-500">No expenses recorded.</p>
                ) : (
                    expenses.map((expense, index) => (
                        <div key={index} className="border-b py-2">
                            {expense.category} - <strong>${expense.amount}</strong>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Expenses;
