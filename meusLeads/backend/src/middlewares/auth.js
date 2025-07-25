const jwt = require("jsonwebtoken")


function authenticateJWT(req, res, next){
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, (error, user)  => {
            if(error){
                return res.sendStatus(403)
            }

            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

module.exports = authenticateJWT