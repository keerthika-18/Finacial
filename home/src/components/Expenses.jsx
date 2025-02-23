import React from "react";
const Expenses =()=>{
    const expenseData =[
        {category :"Rent",amount :1200},
        {category:"Groceries" ,amount:500},
        {category :"Subscriptions",amount:100}
    ]
    return(
        <>
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Expenses</h2>
            <div className="bg-white p--4 rounded-lg shadow-md">
                {expenseData.map((expense,index)=>(
                   <div key={index} className="border-b py-2">{expense.category} - ${expense.amount}</div>
                ))}
            </div>

        </div>
        </>
    )
}

export default Expenses;