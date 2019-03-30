const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
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
                req.active = true
                next();
            }
        });

    } else {
        res.set("Cache-Control", "no-cache, no-store, must-revalidate");
        res.set("Pragma", "no-cache");
        res.set("Expires", -1);

        res.redirect(301, '/')
    }
}

module.exports = verifyToken;