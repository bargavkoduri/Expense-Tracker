const express = require('express')
const mongoose = require('mongoose')
const {MONGO_URI} = require('./constants')
const cors = require("cors");

const WebHookRouter = require('./routes/webhook')
const ExpenseRouter = require('./routes/expenses')

const app = express()

mongoose.set("strictQuery", true);
mongoose.connect(MONGO_URI)
.then(() => {
    app.listen(5000,() => {
        console.log(`Listening on port 5000`)
    })
})

app.use(cors());
app.use(express.json(), (err, req, res, next) => {
    if (err)
        res.sendStatus(400)
    else
        next()
})

app.use("/webhook",WebHookRouter)
app.use("/expense",ExpenseRouter)