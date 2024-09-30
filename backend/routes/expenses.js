const { Router } = require('express')
const router = Router()
const verifyAuth = require('../utils/jwt')
const Expense = require('../models/expense')
const User = require('../models/user')

router.use(verifyAuth)

router.post('', async (req, res) => {
    const { verifiedToken } = req
    const clerkUserId = verifiedToken.sub

    if (!req.body.amount || !req.body.category || !req.body.subCategory || !req.body.purpose) {
        return res.status(400).json({ 'error': 'Invalid Request fields are missing' })
    }

    try {
        let user = await User.findOne({ clerkUserId: clerkUserId })
        let expense = new Expense({
            clerkUserId: clerkUserId,
            category: req.body.category,
            subCategory: req.body.subCategory,
            amount: req.body.amount,
            purpose: req.body.purpose
        })
        expense = await expense.save();
        user.expenses.push(expense._id)
        await user.save()
        res.status(201).json({msg: "Expense Added"})

    } catch (error) {
        res.status(500).json({msg: "Internal Server Error"})
    }
})

router.get('/all', async (req, res) => {
    const { verifiedToken } = req
    const clerkUserId = verifiedToken.sub

    try {
        let {expenses} = await User
        .findOne({ clerkUserId: clerkUserId })
        .populate('expenses')

        res.json(expenses)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg: "Internal Server Error" })
    }
})

module.exports = router