const { Router } = require('express')
const router = Router()
const verifyAuth  = require('../utils/jwt')
const Expense = require('../models/expense')

router.post('',verifyAuth,async(req, res) => {
    const {verifiedToken} = req
    const clerkUserId = verifiedToken.sub

    if(!req.body.amount || !req.body.category || !req.body.subCategory){
        return res.status(400).json({'error': 'Invalid Request fields are missing'})
    }

    try {
        const expense = new Expense({
            clerkUserId: clerkUserId,
            category: req.body.category,
            subCategory: req.body.subCategory,
            amount: req.body.amount
        })
        await expense.save();
    
        res.status(201)

    } catch(error) {
        res.status(500)
    }
})

router.get('',verifyAuth,async(req,res) => {
    
})

module.exports = router