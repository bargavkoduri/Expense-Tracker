const { createClerkClient } = require("@clerk/clerk-sdk-node");
const { CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_JWT_KEY } = require("../constants")

const clerkClient = createClerkClient({
    secretKey: CLERK_SECRET_KEY,
    publishableKey: CLERK_PUBLISHABLE_KEY,
})

const validateAuth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // unauthorized
    if (token === null) {
        return res.status(401).json({
            status: false,
            errors: [
                {
                    message: "You need to sign in to proceed.",
                    code: "NOT_SIGNEDIN",
                },
            ],
        });
    }

    try {
        const verifiedToken = await clerkClient.verifyToken(token, {
            jwtKey: CLERK_JWT_KEY
        })
        req.verifiedToken = verifiedToken
        next()

    } catch(error) {
        res.status(403).json({
            status: false,
            errors: [
                {
                    message: "Invalid Token or Token expired.",
                    code: "INAVLID_TOKEN",
                },
            ],
        });
    }

}

module.exports = validateAuth