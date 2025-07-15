const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();


async function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message: "Login Token Required"});
    }
    try {
        jwt.verify(token, process.env.JWT_KEY, async (error, data) => {
            if (error) {
                return res.status(403).json({message: "Invalid Login Token"});
            }
            req.userID = data.id;
            next();
        })
    } catch (error) {
        next(error);
    }
}

module.exports = verifyToken;