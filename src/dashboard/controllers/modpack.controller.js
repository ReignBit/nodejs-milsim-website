const config = require("../../../config.json");

async function getModpacks(req,res) {
    res.render("dashboard", { 
        title: "Dashboard",
        loginLink: config.oAuth.authUrl,
        session: req.session ?? {},
        dashPage: "modpacks"
    })
}

module.exports = {
    getModpacks
}

