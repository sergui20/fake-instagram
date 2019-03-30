function userActive (req, res, next) {
    if (req.app.locals.isAuthenticated) {
        res.redirect(301, '/homepage')
    } else {
        next();
    }
}

module.exports = userActive;