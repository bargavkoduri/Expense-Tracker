const express = require('express')
const mongoose = require('mongoose')
const {MONGO_URI} = require('./constants')

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

app.use(express.json(), (err, req, res, next) => {
    if (err)
        res.sendStatus(400)
    else
        next()
})

app.use("/webhook",WebHookRouter)
app.use("/expense",ExpenseRouter)

app.post("/adduser",async(req,res) => {
    try {
        const headers = req.headers
        const payload = JSON.stringify(req.body)

        // Get the Svix headers for verification
        const svix_id = headers['svix-id']
        const svix_timestamp = headers['svix-timestamp']
        const svix_signature = headers['svix-signature']

        // If there are no Svix headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).send('Error occured -- no svix headers')
        }

        const wh = new Webhook(CLERK_WEBHOOK_KEY)

        let evt = wh.verify(payload,{
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })

        console.log(evt.data)


        res.status(200).json({
            success: true,
            message: 'Webhook received'
        })

    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
})