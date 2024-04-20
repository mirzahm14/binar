const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization || !authorization.split(' ')[1]){
        return res.status(401).json({message: "Unauthorized"})
    }

    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({message: "Unauthorized"})
        }
        req.user = decoded
        next()
    })
}