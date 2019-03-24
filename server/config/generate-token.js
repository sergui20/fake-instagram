const jwt = require('jsonwebtoken');

function generateToken (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return token;
}

module.exports = generateToken;