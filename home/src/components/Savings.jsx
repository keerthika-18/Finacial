import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Savings = () => {
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [savingsData, setSavingsData] = useState([]);

  useEffect(() => {
    // Fetch income and expenses from backend
    const fetchData = async () => {
      try {
        const incomeRes = await fetch("http://localhost:5000/income/monthly");
        const expenseRes = await fetch("http://localhost:5000/expenses/monthly");

        const incomeData = await incomeRes.json();
        const expenseData = await expenseRes.json();

        setMonthlyIncome(incomeData);
        setMonthlyExpenses(expenseData);

        // Calculate savings per month
        const savings = incomeData.map((income) => {
          const expense = expenseData.find(
            (exp) => exp._id.month === income._id.month && exp._id.year === income._id.year
          );
          return {
            month: income._id.month,
            year: income._id.year,
            savings: income.totalIncome - (expense ? expense.totalExpense : 0),
          };
        });

        setSavingsData(savings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Format data for the chart
  const data = {
    labels: savingsData.map((entry) => `${entry.month}/${entry.year}`),
    datasets: [
      {
        label: "Savings",
        data: savingsData.map((entry) => entry.savings),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Yearly Savings</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Savings;
