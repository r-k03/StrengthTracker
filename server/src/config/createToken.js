const env = require('dotenv');
const jwt = require('jsonwebtoken');
env.config();


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_KEY, {
        expiresIn: '1h'
    });
}

module.exports = createToken;