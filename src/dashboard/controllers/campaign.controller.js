const config = require("../../../config.json")

async function getCampaigns(req, res) {
    res.render("dashboard", { 
        title: "Dashboard",
        loginLink: config.oAuth.authUrl,
        session: req.session ?? {},
        dashPage: "campaigns"
    })
}

module.exports = {
    getCampaigns
}