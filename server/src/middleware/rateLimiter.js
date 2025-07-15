const rateLimit = require('../config/upstash');

async function rateLimiter(req, res, next) {
    try {
        const {success} = await rateLimit.limit(req.userID);
        if (!success) {
            return res.status(429).json({message: "Too Many Requests"});
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = rateLimiter;