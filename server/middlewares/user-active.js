function userActive (req, res, next) {
    var bearerToken = req.cookies.Authorization;

    if (bearerToken) {
        res.redirect(301, '/homepage')
    } else {
        next();
    }
}

module.exports = userActive;