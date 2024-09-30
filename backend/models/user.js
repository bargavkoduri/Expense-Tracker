const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    expenses: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense'}],
        default: []
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User