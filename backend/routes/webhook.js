const { Router } = require('express')
const router = Router()
const { Webhook } = require('svix')
const { WEBHOOK_ADD_USER_KEY, WEBHOOK_REM_USER_KEY } = require('../constants')
const User = require("../models/user")

router.post('/adduser', async (req, res) => {
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

        const wh = new Webhook(WEBHOOK_ADD_USER_KEY)

        let evt = wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })

        const user = new User({
            clerkUserId: evt.data.id,
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
            email: evt.data.email_addresses[0].email_address
        })

        await user.save()

        res.status(200).json({
            success: true,
            message: 'Webhook received'
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
})

router.post('/remuser', (req, res) => {
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

        const wh = new Webhook(WEBHOOK_REM_USER_KEY)

        let evt = wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })



        res.status(200).json({
            success: true,
            message: 'Webhook received'
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
})

module.exports = router