const config = require("../../../config.json");

async function getIntel(req,res) {
    res.render("dashboard", { 
        title: "Dashboard",
        loginLink: config.oAuth.authUrl,
        session: req.session ?? {},
        dashPage: "intel"
    })
}

module.exports = {
    getIntel
}