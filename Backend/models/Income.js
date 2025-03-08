const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    source: String,
    amount: Number,
    date: { type: Date, default: Date.now } // Ensure date is stored
});

const Income = mongoose.model("Income", IncomeSchema);
module.exports = Income;
