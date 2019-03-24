const jwt = require('jsonwebtoken');

function authenticate (req, res, next) {
    var bearerToken = req.cookies.Authorization;
  
    // Decode token
    if (bearerToken) {
        const token = bearerToken.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
            if (err) {
                return res.json({
                    ok: false,
                    err,
                    message: 'Something went wrong. Try again later'
                });
                
            } else {
                req.userData = payload;
                next();
            }
        });

    } else {
        res.redirect(301, '/')
    }
}

module.exports = authenticate;