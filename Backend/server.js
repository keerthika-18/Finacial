const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/finance", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const User = require("./models/User");
// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    console.log("Signup Request Received:", email, password); // Log request data
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
  
      await newUser.save();
      console.log("User Saved Successfully!", newUser); // Log saved user
  
      res.status(201).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Signup failed", error });
    }
  });
  

// Income Schema
const incomeSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  month: Number,
  year: Number,
});

// Middleware to set month and year before saving
incomeSchema.pre("save", function (next) {
  const date = new Date(this.date);
  this.month = date.getMonth() + 1; // Months are 0-based in JS
  this.year = date.getFullYear();
  next();
});

const Income = mongoose.model("Income", incomeSchema);


// Add Income Route
app.post("/income", async (req, res) => {
  const { source, amount } = req.body;
  const income = new Income({ source, amount, date: new Date() });

  try {
      await income.save();
      res.status(201).json(income);
  } catch (error) {
      res.status(500).json({ message: "Failed to add income", error });
  }
});


// Get Income Route
app.get("/income/monthly", async (req, res) => {
  try {
      const incomes = await Income.aggregate([
          {
              $group: {
                  _id: { year: { $year: "$date" }, month: { $month: "$date" } },
                  totalIncome: { $sum: "$amount" },
              },
          },
          { $sort: { "_id.year": -1, "_id.month": -1 } } // Sort latest first
      ]);

      res.status(200).json(incomes);
  } catch (error) {
      res.status(500).json({ message: "Failed to get monthly income", error });
  }
});




// Expenses Schema
const expenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);

// Add Expense Route
app.post("/expenses", async (req, res) => {
  const { category, amount } = req.body;
  const expense = new Expense({ category, amount, date: new Date() });

  try {
      await expense.save();
      res.status(201).json(expense);
  } catch (error) {
      res.status(500).json({ message: "Failed to add expense", error });
  }
});

app.get("/expenses", async (req, res) => {
  try {
      const expenses = await Expense.find().sort({ date: -1 }); // Sort latest first
      res.status(200).json(expenses);
  } catch (error) {
      res.status(500).json({ message: "Failed to get expenses", error });
  }
});
app.get("/income/monthly", async (req, res) => {
  try {
      const income = await Income.aggregate([
          {
              $group: {
                  _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                  totalIncome: { $sum: "$amount" },
              },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      res.status(200).json(income);
  } catch (error) {
      res.status(500).json({ message: "Error fetching income", error });
  }
});
app.get("/expenses/monthly", async (req, res) => {
  try {
      const expenses = await Expense.aggregate([
          {
              $group: {
                  _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                  totalExpense: { $sum: "$amount" },
              },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      res.status(200).json(expenses);
  } catch (error) {
      res.status(500).json({ message: "Error fetching expenses", error });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
