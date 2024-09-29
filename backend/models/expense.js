const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

const Expense = mongoose.model("Expense",expenseSchema)

module.exports = Expense