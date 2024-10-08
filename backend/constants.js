require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI
const WEBHOOK_ADD_USER_KEY = process.env.CLERK_WEBHOOK_ADD_USER_KEY
const WEBHOOK_REM_USER_KEY = process.env.CLERK_WEBHOOK_REM_USER_KEY
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY
const CLERK_JWT_KEY = process.env.CLERK_JWT_KEY

module.exports = { MONGO_URI,WEBHOOK_ADD_USER_KEY,WEBHOOK_REM_USER_KEY,CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,CLERK_JWT_KEY }