const { CLERK_JWT_KEY } = require("../constants")
const jwt = require("jsonwebtoken");


const validateAuth =  (req, res, next) => {
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

    jwt.verify(token,CLERK_JWT_KEY,(err,verifiedToken) => {
        if(err) {
            res.status(403).json({
                message: "Invalid Token or Token expired."
            });
        } else {
            req.verifiedToken = verifiedToken
            next()
        }
    })
}

module.exports = validateAuth