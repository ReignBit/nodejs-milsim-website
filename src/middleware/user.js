module.exports = {

    // Requires the request's session state to be set correctly.
    // Redirects to homepage if not valid session / not logged in.
    async requireLoggedIn(req, res, next) {
        if (req.session.tokenInfo) {
            return next();
        }
        res.redirect("/");
    },


}