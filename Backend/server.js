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
});

const Income = mongoose.model("Income", incomeSchema);

// Add Income Route
app.post("/income", async (req, res) => {
  const { source, amount } = req.body;
  const income = new Income({ source, amount });
  try {
    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: "Failed to add income", error });
  }
});

// Get Income Route
app.get("/income", async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Failed to get incomes", error });
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
app.post("/expense", async (req, res) => {
  const { category, amount } = req.body;
  const expense = new Expense({ category, amount });
  try {
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense", error });
  }
});

// Get Expenses Route
app.get("/expense", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to get expenses", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
